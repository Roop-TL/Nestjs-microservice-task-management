import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ConfigModule } from '@nestjs/config';
import { TaskSchema } from './schema/tasks.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [
    ConfigModule,
    MongooseModule.forFeature([{name : 'Task' , schema : TaskSchema}])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TaskModule {}
