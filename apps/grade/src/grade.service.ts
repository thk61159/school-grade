import { Injectable } from '@nestjs/common';

@Injectable()
export class GradeService {
  getHello(): string {
    return 'Hello World!';
  }
}
