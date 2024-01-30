import { Test, TestingModule } from '@nestjs/testing';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';

describe('GradeController', () => {
  let gradeController: GradeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GradeController],
      providers: [GradeService],
    }).compile();

    gradeController = app.get<GradeController>(GradeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gradeController.getHello()).toBe('Hello World!');
    });
  });
});
