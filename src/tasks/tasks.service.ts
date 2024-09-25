import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class TasksService {
  constructor(
    @InjectQueue('tasks-queue') private readonly taskQueue: Queue,
    @InjectQueue('math-queue') private readonly mathQueue: Queue,
    @InjectQueue('delay-queue') private readonly delayQueue: Queue,
  ) {}

  async addTask(name: string) {
    await this.taskQueue.add({ name });
    console.log('Task added to queue:', name);
  }

  async addMathTask(num1: number, num2: number) {
    await this.mathQueue.add({ num1, num2 });
    console.log(`Math task added to queue: ${num1} + ${num2}`);
  }

  async addDelayTask(delay: number) {
    await this.delayQueue.add({ delay });
    console.log(`Delay task added to queue for ${delay}ms`);
  }
}
