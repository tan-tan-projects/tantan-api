export declare class Resource {
    id: string;
    userId: string;
    publicId: string;
    resourceType: string;
    format: string;
    bytes: number;
    width: number;
    height: number;
    status: 'TEMPORARY' | 'ATTACHED' | 'FAILED';
    error: string;
    created_at: Date;
    updated_at: Date;
}
