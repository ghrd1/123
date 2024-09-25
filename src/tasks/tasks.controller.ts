import { Controller, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('add')
  async addTask(@Body('name') name: string) {
    await this.tasksService.addTask(name);
    return { message: 'Task added successfully', task: name };
  }

  @Post('add-math')
  async addMathTask(@Body('num1') num1: number, @Body('num2') num2: number) {
    await this.tasksService.addMathTask(num1, num2);
    return {
      message: 'Math task added successfully',
      task: `${num1} + ${num2}`,
    };
  }

  @Post('add-delay')
  async addDelayTask(@Body('delay') delay: number) {
    await this.tasksService.addDelayTask(delay);
    return { message: `Delay task added for ${delay}ms` };
  }
}
