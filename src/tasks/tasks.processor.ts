import { PrismaService } from './../../prisma/prisma.service';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { logger } from '../../logger';

@Processor('tasks-queue')
export class TasksProcessor {
  constructor(private prisma: PrismaService) {}

  @Process()
  async handleTask(job: Job) {
    const { name } = job.data;
    const startTime = new Date();
    logger.info(`Process ${process.pid} started task: ${name}`);

    await this.prisma.task.create({
      data: {
        name,
        status: 'COMPLETED',
      },
    });

    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    logger.info(
      `Process ${process.pid} completed task ${name}. Duration: ${duration}ms`,
    );
  }
}

@Processor('math-queue')
export class MathProcessor {
  constructor() {}

  @Process()
  async handleMathTask(job: Job) {
    const { num1, num2 } = job.data;
    const startTime = new Date();
    logger.info(
      `Process ${process.pid} processing math task: ${num1} + ${num2}`,
    );

    const result = num1 + num2;
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    logger.info(
      `Process ${process.pid} math task result: ${result}. Duration: ${duration}ms`,
    );
  }
}

@Processor('delay-queue')
export class DelayProcessor {
  constructor() {}

  @Process()
  async handleDelayTask(job: Job) {
    const { delay } = job.data;

    const startTime = new Date();
    logger.info(
      `Process ${process.pid} simulating delay task for ${delay}ms...`,
    );

    await new Promise((resolve) => setTimeout(resolve, delay));

    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    logger.info(
      `Process ${process.pid} completed delay task after ${delay}ms. Duration: ${duration}ms`,
    );
  }
}
