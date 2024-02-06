import { Injectable } from "@nestjs/common";
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { YAML_CONFIG_PATH } from './constant'
import { DEFAULT_CONFIG } from "./config.default";
import { IConfigData } from "./config.interface";

@Injectable()
export class ConfigService {
  public config: IConfigData;
  private yamlPath: string = YAML_CONFIG_PATH
  constructor(data: IConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }
  private generateYaml = () => {
    const yamlData: Record<string, any> = {};
    for (const key in DEFAULT_CONFIG) {
      yamlData[key] = DEFAULT_CONFIG[key];
    }
    const yamlString = yaml.dump(yamlData);
    fs.writeFileSync(this.yamlPath, yamlString);

  }
  public loadFromYaml = () => {
    const yamlExist = fs.existsSync(this.yamlPath)
    if (!yamlExist) { this.generateYaml() }
    let configs = yaml.load(
      fs.readFileSync(this.yamlPath, 'utf8'),
    )
    function checkTowObjKey(obj1, obj2) {
      for (const key in obj1) {
        if (!obj2.hasOwnProperty(key)) throw new Error(`${obj2.name} was missing key ${key}`)
        if (typeof obj1[key] === 'object') {
          checkTowObjKey(obj1[key], obj2[key])
        }
      }
      return 1
    }

    this.config = configs as IConfigData
  }

  public get _(): Readonly<IConfigData> {
    return this.config;
  }
  public setYamlPath = (yamlPath: string) => {
    this.yamlPath = yamlPath
  }
  public setConfig = (value: any, ...keys: string[]) => {
    let temp = this.config;
    let target = this.config;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      target = target[key];
    }

    const lastKey = keys[keys.length - 1];
    target[lastKey] = value;
  }
}