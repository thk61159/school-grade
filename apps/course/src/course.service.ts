import { Injectable, Param } from '@nestjs/common';
import { LoggerService, Tag } from '@dev/logger';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Selection } from '../db';

@Injectable()
export class CourseService {
  constructor(
    @Tag(this) public log: LoggerService,
    @InjectRepository(Course) private courseRepoository: Repository<Course>,
    @InjectRepository(Selection) private selectionRepoository: Repository<Selection>
  ) {
    this.log.i('test')
  }
  getCourses(): Promise<Course[]> {
    return this.courseRepoository.find()
  }


  // @Param('courseTitle')
  getCourse( courseTitle: string): Promise<Course> {
    return this.courseRepoository.findOneBy({ title: courseTitle })
  }

  // @Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto
  updateCourseById(id, updateCourseDto) {
    return this.courseRepoository.update(id, updateCourseDto)
  }

}
