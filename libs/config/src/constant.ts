import * as path from 'path';

export const BASE_DIR = process.argv[1].includes('snapshot') ?
  path.dirname(process.argv[0]) :
  __filename === process.argv[1] ?
    __dirname :
    process.cwd()
export const YAML_CONFIG_PATH = path.join(BASE_DIR, 'config', 'config.yaml');

export const FRONT_DIR = path.join(BASE_DIR, 'front');