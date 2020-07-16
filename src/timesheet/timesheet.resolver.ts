import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { Timesheet } from './timesheet.entity';
import { TimesheetService } from './timesheet.service';
import { TimesheetDto, UpdateTimesheetDto } from './timesheet.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

const pubSub = new PubSub();
@Resolver(of => Timesheet)
export class TimesheetResolver {
  constructor(
    private timesheetService: TimesheetService,
    private employeeService: EmployeeService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Query(returns => [Timesheet])
  async getTimesheets(): Promise<Timesheet[]> {
    return await this.timesheetService.getAllTimesheets();
  }

  @Query(() => Timesheet, { nullable: true })
  async timesheet(@Args('id', { type: () => Int }) id: number) {
    return await this.timesheetService.getTimesheet(id);
  }

  @Mutation(returns => Timesheet)
  async createTimeSheet(@Args('timesheetInput') timesheet: TimesheetDto) {
    try {
      const newTimesheet = await this.timesheetService.createTimesheet(
        timesheet,
      );
      this.pubSub.publish('timesheetAdded', { timesheetAdded: newTimesheet });
      return newTimesheet;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Mutation(() => Timesheet)
  async deleteTimesheet(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Timesheet> {
    return await this.timesheetService.deleteTimesheet(id);
  }
  @Mutation(returns => Timesheet)
  async updateTimesheet(
    @Args('updateTimesheetInput') updateTimesheetInput: UpdateTimesheetDto,
  ) {
    return await this.timesheetService.updateTimesheet(updateTimesheetInput);
  }
  @ResolveField()
  async employee(@Parent() timesheet: Timesheet) {
    const { employeeId } = timesheet;
    return await this.employeeService.getEmployee(employeeId);
  }
}
