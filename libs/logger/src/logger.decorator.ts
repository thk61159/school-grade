import { Inject } from '@nestjs/common';

export const tagsForLoggers: string[] = new Array<string>();

export function Tag(instanceOrStr: Object | string, parentInstance: Object = '') {
  const mainTag = typeof instanceOrStr === 'string' ? instanceOrStr : Object.keys(instanceOrStr)[0]
  const parentTag = Object.keys(parentInstance)[0]||''
  const tag = mainTag + '|' + parentTag
  if (!tagsForLoggers.includes(tag)) {
    tagsForLoggers.push(tag);
  }
  return Inject(`Logger${tag}`);
}

// public setTag = (instanceOrStr: Loggable | string, parentInstance: Loggable = null): void => {
//   this.tag = typeof instanceOrStr === 'string' ? instanceOrStr : instanceOrStr.constructor.name;
//   this.parent = parentInstance?.log;
// };