import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
  }

@Schema()
export class Task {

    @Prop()
    title : string;

    @Prop()
    description : string;

    @Prop()
    status : TaskStatus;

    @Prop()
    createdAt : string;

    @Prop()
    updatedAt : string;
}

export const TaskSchema = SchemaFactory.createForClass(Task)