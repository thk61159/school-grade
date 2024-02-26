import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Grade } from '../../grade/db/grade.entity';
import { Course } from './course.entity';
import { User } from '../../user/db/user.entity';


@Entity({ name: 'selections' })
export class Selection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.selects)
  course: Course

  @ManyToOne(() => User, (user) => user.selects)
  user: User


}