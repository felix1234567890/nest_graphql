import { Module } from '@nestjs/common';
import { profileProviders } from './profile.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { EmployeeService } from 'src/employee/employee.service';
import { employeeProviders } from 'src/employee/employee.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...profileProviders,
    ...employeeProviders,
    ProfileService,
    ProfileResolver,
    EmployeeService,
  ],
})
export class ProfileModule {}
