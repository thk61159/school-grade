import { IConfigData } from "./config.interface";

export const DEFAULT_CONFIG: IConfigData = {
  node_version: 0,
  node_env: 'development',
  log: {
    httplog_ip: "",
    httplog_port: null,
    syslog_ip: "",
    syslog_port: null,
    syslog_protocol: "",
    path: './logs',
    sys_logs: false,
    daily_logs: true,
    console_logs: true,
    http_logs: false
  },
  db: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'test',
    synchronize: true,
    logging: false,
  }
}