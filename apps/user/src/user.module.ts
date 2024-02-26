import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../db';
import { Course, Selection } from '../../course/db';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Selection, User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
