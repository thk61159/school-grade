import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Grade } from '../../grade/db/grade.entity';
import { Selections } from '../../course/db/selections.entity';

enum Gender {
  female = 'female',
  male = 'male',
}

enum Role {
  teacher = 'teacher',
  student = 'student',
  other = 'other'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: Gender;

  @Column()
  birthday: Date;

  @Column()
  addr: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  role: Role;

  @OneToMany(() => Grade, (grade) => grade.user)
  grades: Grade[]

  @OneToMany(() => Selections, (select) => select.user)
  selects: Selections[]

}