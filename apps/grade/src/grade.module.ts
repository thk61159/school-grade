import { Module } from '@nestjs/common';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';

@Module({
  imports: [],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
