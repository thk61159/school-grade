import { LoggerService, Tag } from '@dev/logger';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AppService {
  constructor(
    @Tag(this) public log: LoggerService,
    private moduleRef: ModuleRef
    ) {
    // this.log.i('test', moduleRef)
  }
  getHello(): string {

    return 'Hello World!';
  }
}
