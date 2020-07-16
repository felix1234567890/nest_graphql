import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeDto, UpdateEmployeeDto } from './employee.dto';
import { TimesheetService } from 'src/timesheet/timesheet.service';
import { ProfileService } from 'src/profile/profile.service';
import { Timesheet } from 'src/timesheet/timesheet.entity';
import { PubSubEngine } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(of => Employee)
export class EmployeeResolver {
  constructor(
    private employeeService: EmployeeService,
    private timesheetService: TimesheetService,
    private profileService: ProfileService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Query(() => [Employee], { name: 'employeesList' })
  employees() {
    return this.employeeService.getEmployees();
  }

  @Query(() => Employee, { nullable: true })
  employee(@Args('id', { type: () => Int }) id: number) {
    return this.employeeService.getEmployee(id);
  }

  @Mutation(returns => Employee)
  createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: EmployeeDto,
  ) {
    const employee = this.employeeService.createEmployee(createEmployeeInput);
    this.pubSub.publish('employeeAdded', { employeeAdded: employee });
    return employee;
  }
  @Mutation(() => Employee)
  deleteEmployee(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Employee> {
    return this.employeeService.deleteEmployee(id);
  }
  @Mutation(returns => Employee)
  updateEmployee(
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(updateEmployeeInput);
  }
  @ResolveField()
  async timesheets(@Parent() employee: Employee) {
    const { id } = employee;
    return this.timesheetService.getEmployeeTimesheets(id);
  }
  @ResolveField()
  async profileImage(@Parent() employee: Employee) {
    const { id } = employee;
    return this.profileService.getEmployeeProfile(id);
  }
  @Subscription(returns => Timesheet)
  timesheetAdded() {
    return this.pubSub.asyncIterator('timesheetAdded');
  }
}
