import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Grade } from '../../grade/db/grade.entity';
import { Selection } from './selection.entity';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  intro: string;

  @OneToMany(() => Grade, (grade) => grade.course) 
    grades: Grade[]

  @OneToMany(() => Selection, (select) => select.course) 
    selects: Selection[]
}