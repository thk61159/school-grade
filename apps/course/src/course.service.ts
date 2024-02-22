import { Injectable } from '@nestjs/common';
import { LoggerService, Tag } from '@dev/logger';

@Injectable()
export class CourseService {
  constructor(@Tag(this) public log: LoggerService) {
    this.log.i('test')
  }
  getHello(): string {
    return 'Hello World!';
  }
}
