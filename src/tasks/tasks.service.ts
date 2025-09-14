import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entities';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/users/user.entities';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './taskstatus';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasks: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto, user: User): Promise<Task> {
    if (!user) {
      throw new UnauthorizedException('no user found');
    }
    const task = this.tasks.create({
      ...dto,
      status: dto.status ?? TaskStatus.DONE,
      user,
    });
    return this.tasks.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
    if (!user) {
      throw new UnauthorizedException('No user found');
    }

    return this.tasks.find({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, user: User): Promise<Task> {
    if (!user) {
      throw new UnauthorizedException('No user found');
    }
    const task = await this.tasks.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(
    id: number,
    updatedTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.findOne(id, user);

    Object.assign(task, updatedTaskDto);
    return this.tasks.save(task);
  }

  async remove(id: number, user: User): Promise<void> {
    const task = await this.findOne(id, user);
    await this.tasks.remove(task);
  }
}
