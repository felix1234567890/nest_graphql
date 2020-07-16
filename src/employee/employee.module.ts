import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { employeeProviders } from './employee.providers';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TimesheetService } from 'src/timesheet/timesheet.service';
import { timesheetProviders } from 'src/timesheet/timesheet.providers';
import { profileProviders } from 'src/profile/profile.providers';
import { ProfileService } from 'src/profile/profile.service';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...employeeProviders,
    ...timesheetProviders,
    ...profileProviders,
    EmployeeService,
    EmployeeResolver,
    ProfileService,
    TimesheetService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class EmployeeModule {}
