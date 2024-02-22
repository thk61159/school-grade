import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Grade } from '../../grade/db/grade.entity';
import { Selections } from './selections.entity';
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  intro: string;

  @OneToMany(() => Grade, (grade) => grade.course) 
    grades: Grade[]

  @OneToMany(() => Selections, (select) => select.course) 
    selects: Selections[]
}