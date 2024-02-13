import { IsEnum } from "class-validator";
import { TaskStatus } from "../schema/tasks.schema";

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status : TaskStatus
}