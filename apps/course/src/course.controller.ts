import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import {CourseDto} from './dto/Course.dto'

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getCourses() {
    return this.courseService.getCourses()
  }

  @Get()
  getCourse( @Param('courseTitle') courseTitle: string) {
    return this.courseService.getCourse(courseTitle)
  }

  @Post()
  updateCourseById(@Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: CourseDto) {
    return this.courseService.updateCourseById(id, updateCourseDto)
  }
}
