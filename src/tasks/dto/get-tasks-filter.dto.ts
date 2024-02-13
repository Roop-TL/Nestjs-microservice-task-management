import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../schema/tasks.schema";
export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status : TaskStatus // ? means optional

    @IsOptional()
    @IsString()
    search : string
}