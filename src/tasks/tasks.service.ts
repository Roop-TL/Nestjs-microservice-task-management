import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./schema/tasks.schema";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskDto } from "./dto/task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./schema/tasks.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Logger } from "@nestjs/common";


@Injectable()
export class TasksService {
  private logger = new Logger('TasksController'); //Given contect TasksController
  constructor(
    @InjectModel(Task.name)
    private taskModel : mongoose.Model<Task>
  ) {}

  //Function to get all tasks
  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find()
    return tasks;
  }

  async getTaskById(taskDto: TaskDto): Promise<Task> {
    const { id } = taskDto;
    const task = await this.taskModel.findById(id)
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    } else {
      return task;
    }
  }

  async getTaskWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    let tasks = await this.getAllTasks();
    if (status) {
      // tasks = tasks.filter((task) => task.status === status);
      tasks = await this.taskModel.find({status : status})
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return task;
        }
        return;
      });
    }

    return tasks;
  }

  //Function to create a task
async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      createdAt : Date.now().toString(),
      updatedAt : Date.now().toString()

    };
    const createdTask = await this.taskModel.create(task)
    return createdTask
  }

  //Delete task by Id
  async deleteTaskById(taskDto: TaskDto): Promise<Object> {
    const { id } = taskDto;
    const taskToBeDeleted = this.taskModel.findById(id);
    if(!taskToBeDeleted) {
      throw new NotFoundException(`The task with ID ${id} is not found`)
    }
    const deleteResponse = await this.taskModel.deleteOne({_id : id})
    this.logger.verbose("Delete task operation service",JSON.stringify(deleteResponse))
    if(deleteResponse.deletedCount > 0) {
      return { status: 200, msg: `Task ${id} successfully deleted` };
    }

  }

 async updateTaskStatus(taskDto: TaskDto, status: TaskStatus): Promise<Task> {
    const { id } = taskDto;
    const updateValue = TaskStatus[status];
    if (updateValue) {
      try {
       const response = await this.taskModel.findByIdAndUpdate(id , {status : updateValue })
       this.logger.verbose(`Updated task ${id} to status : ${updateValue}` )
       return response
      } catch (error) {
        this.logger.error("Error In update" , error.message)
        return error.message
      }
    }
  }
}
