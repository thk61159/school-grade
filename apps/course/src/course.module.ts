import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Selection, Course} from '../db';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Selection])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {
  
}
