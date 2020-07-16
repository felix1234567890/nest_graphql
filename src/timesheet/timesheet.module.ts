import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { timesheetProviders } from './timesheet.providers';
import { TimesheetResolver } from './timesheet.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { EmployeeService } from 'src/employee/employee.service';
import { employeeProviders } from 'src/employee/employee.providers';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [DatabaseModule],
  providers: [
    TimesheetService,
    ...timesheetProviders,
    TimesheetResolver,
    EmployeeService,
    ...employeeProviders,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class TimesheetModule {}
