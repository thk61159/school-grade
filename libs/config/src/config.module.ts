import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { IConfigOptions } from "./config.interface";

const configFactory = (yamlPath?: string) => {
  return {
    provide: ConfigService,
    useFactory: () => {
      const config = new ConfigService();
      yamlPath && config.setYamlPath(yamlPath)
      config.loadFromYaml();
      return config;
    },
  }
};

@Global()
@Module({})
export class ConfigModule {
  static register(options?: IConfigOptions): DynamicModule {
    const { yamlPath } = options || null
    return yamlPath ? {
      module: ConfigModule,
      providers: [configFactory(yamlPath)],
      exports: [configFactory(yamlPath)],
    } : {
      module: ConfigModule,
      providers: [configFactory()],
      exports: [configFactory()],
    }
  }
}