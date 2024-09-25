import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {
  TasksProcessor,
  MathProcessor,
  DelayProcessor,
} from './tasks.processor';
import { PrismaModule } from '../../prisma/prisma.module';
@Module({
  imports: [
    BullModule.registerQueue(
      { name: 'tasks-queue' },
      { name: 'math-queue' },
      { name: 'delay-queue' },
    ),
    PrismaModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksProcessor, MathProcessor, DelayProcessor],
})
export class TasksModule {}
