
export interface ILogConfig {
  httplog_ip: string;
  httplog_port: number|null;
  syslog_ip: string;
  syslog_port: number|null;
  syslog_protocol: string;
  path: string;
  sys_logs: boolean;
  daily_logs: boolean;
  console_logs: boolean;
  http_logs: boolean;
}


export interface IDbConfig{
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}
export interface IConfigData {
  node_version: number;
  node_env: 'development' | 'production' | 'test';
  log: ILogConfig
  db:IDbConfig
}

export interface IConfigOptions{
  yamlPath?:string;
}