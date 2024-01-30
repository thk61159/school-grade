import { Controller, Get } from '@nestjs/common';
import { GradeService } from './grade.service';

@Controller()
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Get()
  getHello(): string {
    return this.gradeService.getHello();
  }
}
