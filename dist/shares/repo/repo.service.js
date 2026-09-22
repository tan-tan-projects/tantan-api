var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RepoService_1;
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource, Raw } from 'typeorm';
import { LoggerService } from '../../core/logger/logger.service.js';
import { getDataSourceToken } from '@nestjs/typeorm';
let RepoService = RepoService_1 = class RepoService {
    coreDataSource;
    appDataSource;
    rowPerPage = 25;
    LOGGER;
    constructor(coreDataSource, appDataSource, logger) {
        this.coreDataSource = coreDataSource;
        this.appDataSource = appDataSource;
        this.LOGGER = logger.create(RepoService_1.name);
    }
    getDataSource(entity) {
        if (this.coreDataSource.hasMetadata(entity))
            return this.coreDataSource;
        if (this.appDataSource.hasMetadata(entity))
            return this.appDataSource;
        throw new Error(`Entity ${typeof entity === 'string' ? entity : entity.name} is not registered in any database`);
    }
    getManager(entity) {
        return this.getDataSource(entity).manager;
    }
    getModels() {
        return [...this.coreDataSource.entityMetadatas, ...this.appDataSource.entityMetadatas].map(e => e.name);
    }
    getRepository(entity) {
        return this.getDataSource(entity).getRepository(entity);
    }
    getFields(entity) {
        return this.getRepository(entity).metadata.columns;
    }
    getRelations(entity) {
        const relations = {};
        for (const relation of this.getRepository(entity).metadata.relations) {
            relations[relation.propertyName] = true;
        }
        return relations;
    }
    async findOne(entity, options, silent = false) {
        const item = await this.getRepository(entity).findOne(options);
        if (!item && !silent) {
            const name = typeof entity === 'string' ? entity : (entity instanceof Function ? entity.name : 'unknown');
            let criteriaStr = '';
            if ('where' in options && options.where) {
                const keys = Object.keys(options.where);
                criteriaStr = keys.map(k => `${k}: ${options.where[k]}`).join(', ');
            }
            throw new HttpException(`Data ${name} with criteria ${criteriaStr} not found!`, HttpStatus.NOT_FOUND);
        }
        return item;
    }
    async findOneWithRelations(entity, options, silent = false) {
        const findOneOptions = options ? options : {};
        findOneOptions.relations = this.getRelations(entity);
        return this.findOne(entity, findOneOptions, silent);
    }
    async findOneBy(entity, options, silent = false) {
        const item = await this.getRepository(entity).findOneBy(options);
        if (!item && !silent) {
            const name = typeof entity === 'string' ? entity : (entity instanceof Function ? entity.name : 'unknown');
            throw new HttpException(`No ${name} found`, HttpStatus.NOT_FOUND);
        }
        return item;
    }
    find(entity, options) {
        return this.getRepository(entity).find(options);
    }
    findWithRelations(entity, options) {
        const findOptions = options ? options : {};
        findOptions.relations = this.getRelations(entity);
        return this.find(entity, findOptions);
    }
    findBy(entity, options) {
        return this.getRepository(entity).findBy(options);
    }
    findByWithRelations(entity, options) {
        return this.find(entity, { where: options, relations: this.getRelations(entity) });
    }
    buildSelect(fields) {
        return fields.reduce((obj, field) => { obj[field] = true; return obj; }, {});
    }
    addRelation(relations, relation) {
        relations[relation] = true;
    }
    parseRelationField(field) {
        const separatorIndex = field.indexOf('.');
        if (separatorIndex <= 0 || separatorIndex === field.length - 1) {
            return undefined;
        }
        const relation = field.slice(0, separatorIndex);
        const column = field.slice(separatorIndex + 1);
        return [relation, column];
    }
    findWithRelationsAndPagination(entity, options, findOptions) {
        return this.findWithPagination(entity, options, { relations: this.getRelations(entity), ...findOptions });
    }
    async findWithPagination(entity, options, findOptions) {
        if (!options)
            throw new HttpException('Query options are required', HttpStatus.BAD_REQUEST);
        const defaultPagination = {
            page: 1,
            rowsPerPage: this.rowPerPage,
            sortBy: null,
            descending: false
        };
        const pagination = options.pagination
            ? options.pagination
            : defaultPagination;
        const field = this.getFields(entity);
        const defaultSelect = this.buildSelect(field.filter((el) => el.isSelect).map((el) => el.propertyName));
        const metadata = this.getRepository(entity).metadata;
        const defaultSearchFields = [];
        for (const column of metadata.columns) {
            if (column.isSelect && !column.isCreateDate && !column.isUpdateDate)
                defaultSearchFields.push(column.propertyName);
        }
        if (findOptions?.relations) {
            for (const relation of metadata.relations) {
                for (const column of relation.inverseEntityMetadata.columns) {
                    if (column.isSelect && !column.isCreateDate && !column.isUpdateDate)
                        defaultSearchFields.push(`${relation.propertyName}.${column.propertyName}`);
                }
            }
        }
        const searchFields = options.searchFields && options.searchFields.length ? options.searchFields : defaultSearchFields;
        const page = pagination.page;
        const take = pagination.rowsPerPage;
        const skip = (page - 1) * take;
        const viewOptions = {
            select: options.select?.length
                ? this.buildSelect(options.select)
                : defaultSelect,
            relations: {},
            order: {},
        };
        if (take > 0) {
            viewOptions['take'] = take;
            viewOptions['skip'] = skip;
        }
        if (findOptions)
            Object.assign(viewOptions, findOptions);
        if (pagination.sortBy)
            viewOptions.order[pagination.sortBy] = pagination.descending ? "DESC" : "ASC";
        let baseWhere = [];
        if (viewOptions.where)
            baseWhere = Array.isArray(viewOptions.where) ? [...viewOptions.where] : [viewOptions.where];
        const finalWhere = [];
        if (options.filter) {
            const filterConditions = Object.entries(options.filter).map(([key, value]) => {
                const relationField = this.parseRelationField(key);
                if (relationField) {
                    const [relation, column] = relationField;
                    this.addRelation(viewOptions.relations, relation);
                    return {
                        [relation]: {
                            [column]: value,
                        },
                    };
                }
                return {
                    [key]: value,
                };
            });
            if (baseWhere.length) {
                for (const base of baseWhere) {
                    for (const filter of filterConditions) {
                        finalWhere.push({
                            ...base,
                            ...filter,
                        });
                    }
                }
            }
            else {
                finalWhere.push(...filterConditions);
            }
        }
        else {
            finalWhere.push(...baseWhere);
        }
        if (options.search) {
            const searched = [];
            for (const field of searchFields) {
                if (!field)
                    continue;
                const relationField = this.parseRelationField(field);
                if (relationField) {
                    const [relation, column] = relationField;
                    this.addRelation(viewOptions.relations, relation);
                    const condition = {
                        [relation]: {
                            [column]: this.getDataSource(entity).options.type === "postgres"
                                ? Raw((alias) => `CAST(${alias} AS TEXT) ILIKE :search`, {
                                    search: `%${options.search}%`,
                                })
                                : Raw((alias) => `CAST(${alias} AS CHAR) LIKE :search`, {
                                    search: `%${options.search}%`,
                                }),
                        },
                    };
                    if (finalWhere.length) {
                        for (const base of finalWhere) {
                            searched.push({
                                ...base,
                                ...condition,
                            });
                        }
                    }
                    else {
                        searched.push(condition);
                    }
                }
                else {
                    const condition = {
                        [field]: this.getDataSource(entity).options.type === "postgres"
                            ? Raw((alias) => `CAST(${alias} AS TEXT) ILIKE :search`, {
                                search: `%${options.search}%`,
                            })
                            : Raw((alias) => `CAST(${alias} AS CHAR) LIKE :search`, {
                                search: `%${options.search}%`,
                            }),
                    };
                    if (finalWhere.length) {
                        for (const base of finalWhere) {
                            searched.push({
                                ...base,
                                ...condition,
                            });
                        }
                    }
                    else {
                        searched.push(condition);
                    }
                }
            }
            viewOptions.where = searched;
        }
        else if (finalWhere.length) {
            viewOptions.where = finalWhere;
        }
        try {
            return await this.getRepository(entity).findAndCount(viewOptions);
        }
        catch (error) {
            throw error;
        }
    }
    async saveWithTransaction(entity, data, options) {
        const repo = this.getRepository(entity);
        return await repo.manager.transaction(async (manager) => {
            try {
                const instance = repo.create(data);
                return await manager.save(repo.create(instance), options);
            }
            catch (err) {
                throw err;
            }
        });
    }
    async updateWithTransaction(entity, options, data, saveOptions) {
        const repo = this.getRepository(entity);
        return await repo.manager.transaction(async (manager) => {
            try {
                const whereList = Array.isArray(options) ? options : [options];
                const dataList = Array.isArray(data) ? data : [data];
                if (whereList.length !== dataList.length) {
                    throw new HttpException('The number of update conditions must match the number of data items.', HttpStatus.BAD_REQUEST);
                }
                const items = [];
                for (let i = 0; i < whereList.length; i++) {
                    const item = await manager.findOne(repo.target, { where: whereList[i] });
                    if (!item) {
                        throw new HttpException(`No ${String(entity)} found for update.`, HttpStatus.NOT_FOUND);
                    }
                    Object.assign(item, dataList[i]);
                    items.push(item);
                }
                if (items.length === 1)
                    return await manager.save(items[0], saveOptions);
                return await manager.save(items, saveOptions);
            }
            catch (err) {
                throw err;
            }
        });
    }
    async save(entity, data, options) {
        try {
            const repo = this.getRepository(entity);
            if (Array.isArray(data)) {
                const instances = repo.create(data);
                return await repo.save(instances, options);
            }
            const instance = repo.create(data);
            return await repo.save(instance, options);
        }
        catch (error) {
            throw error;
        }
    }
    async update(entity, options, data, saveOptions) {
        try {
            const repo = this.getRepository(entity);
            const whereList = Array.isArray(options) ? options : [options];
            const dataList = Array.isArray(data) ? data : [data];
            if (whereList.length !== dataList.length) {
                throw new HttpException('The number of update conditions must match the number of data items.', HttpStatus.BAD_REQUEST);
            }
            const items = [];
            for (let i = 0; i < whereList.length; i++) {
                const item = await repo.findOne({ where: whereList[i] });
                if (!item) {
                    throw new HttpException(`No ${String(entity)} found for update.`, HttpStatus.NOT_FOUND);
                }
                Object.assign(item, dataList[i]);
                items.push(item);
            }
            if (items.length === 1)
                return await repo.save(items[0], saveOptions);
            return await repo.save(items, saveOptions);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(entity, options, soft = false) {
        try {
            const repo = this.getRepository(entity);
            const whereList = Array.isArray(options) ? options : [options];
            const records = [];
            for (const where of whereList) {
                const record = await repo.findOne({ where });
                if (!record) {
                    throw new HttpException(`${String(repo.metadata.tableName)} not found for delete.`, HttpStatus.NOT_FOUND);
                }
                records.push(record);
            }
            if (soft) {
                if (records.length === 1)
                    return await repo.softRemove(records[0]);
                return await repo.softRemove(records);
            }
            if (records.length === 1)
                return await repo.remove(records[0]);
            return await repo.remove(records);
        }
        catch (error) {
            throw error;
        }
    }
};
RepoService = RepoService_1 = __decorate([
    Injectable(),
    __param(0, Inject(getDataSourceToken('core'))),
    __param(1, Inject(getDataSourceToken('app'))),
    __metadata("design:paramtypes", [DataSource,
        DataSource,
        LoggerService])
], RepoService);
export { RepoService };
//# sourceMappingURL=repo.service.js.map