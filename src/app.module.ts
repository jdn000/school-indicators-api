import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { NestPgpromiseModule } from 'nestjs-pgpromise';
import { AlumnModule } from './alumn/alumn.module';
import { AuthModule } from './auth/auth.module';
import { CalificationModule } from './calification/calification.module';
import { GradeModule } from './grade/grade.module';
import { IndicatorModule } from './indicator/indicator.module';
import { LearningObjectiveModule } from './learning-objective/learning-objective.module';
import { ReportModule } from './report/report.module';
import { SemesterModule } from './semester/semester.module';
import { SubjectModule } from './subject/subject.module';
import { UserModule } from './user/user.module';
import { UserSubjectModule } from './user-subject/user-subject.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NestPgpromiseModule.register({
      connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }
    }),
    AlumnModule,
    AuthModule,
    CalificationModule,
    GradeModule,
    IndicatorModule,
    LearningObjectiveModule,
    ReportModule,
    SemesterModule,
    SubjectModule,
    UserModule,
    UserSubjectModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
