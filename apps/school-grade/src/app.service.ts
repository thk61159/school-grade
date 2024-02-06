import { LoggerService, Tag } from '@dev/logger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Tag(this) public log: LoggerService) {
    this.log.i('test')
  }
  getHello(): string {
    
    return 'Hello World!';
  }
}
