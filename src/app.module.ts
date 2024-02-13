import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.stage.${process.env.STAGE}`,
      isGlobal : true
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/tasks'),
    TaskModule
  ],
})
export class AppModule {}
