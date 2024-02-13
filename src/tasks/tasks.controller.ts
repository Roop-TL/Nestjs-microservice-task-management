import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./schema/tasks.schema";
import { Task } from "./schema/tasks.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskDto } from "./dto/task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { Logger } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";

@Controller("tasks")
export class TasksController {
  private logger = new Logger('TasksController'); //Given contect TasksController
  constructor(private tasksService: TasksService,
    // private configService : ConfigService
    ) {
      // console.log(configService.get('TEST_VALUE'))
    }
  @Get()
  async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    this.logger.verbose(JSON.stringify(filterDto),true)
    // return this.tasksService.getAllTasks();

    if (Object.keys(filterDto).length > 0) {
      return this.tasksService.getTaskWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get("/:id")
  async getTaskById(@Param() taskDto: TaskDto): Promise<Task> {
    this.logger.verbose("Find task by id task DTO",JSON.stringify(taskDto))
    return this.tasksService.getTaskById(taskDto);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    this.logger.verbose("Create Task DTO",JSON.stringify(createTaskDto))
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  async deleteTaskById(@Param() taskDto: TaskDto): Promise<Object> {
    return this.tasksService.deleteTaskById(taskDto);
  }

  @Patch("/:id/status")
  async updateTaskStatus(
    @Param() taskDto: TaskDto,
    @Body() updateTaskStatus: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTaskStatus(taskDto, status);
  }
}
