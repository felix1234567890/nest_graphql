import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EmployeeModule } from './employee/employee.module';
import { ProfileModule } from './profile/profile.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import { PubSub } from 'graphql-subscriptions';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
     driver: ApolloDriver,
     playground:true,
     autoSchemaFile:true
    }),
    EmployeeModule,
    ProfileModule,
    TimesheetModule,
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
