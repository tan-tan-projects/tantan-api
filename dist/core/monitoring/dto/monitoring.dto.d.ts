import { Monitoring } from "../entities/monitoring.entity.js";
export declare class MonitoringDTO {
    method: Monitoring['method'];
    url: Monitoring['url'];
    user?: Monitoring['user'];
    ip?: Monitoring['ip'];
    status: Monitoring['status'];
    error?: Monitoring['error'];
    duration: Monitoring['duration'];
}
