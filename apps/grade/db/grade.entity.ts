import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from '../../course/db/course.entity';
import { User } from '../../user/db/user.entity';

enum Term {
  first = 'first',
  second = 'second',
  third = 'third',
}
@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  term: Term;
  
  @ManyToOne(() => Course, (course) => course.grades)
  course: Course

  @ManyToOne(() => User, (user) => user.grades)
  user: User

}