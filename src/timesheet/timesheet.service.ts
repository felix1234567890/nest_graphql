import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Timesheet } from './timesheet.entity';
import { UpdateTimesheetDto } from './timesheet.dto';

@Injectable()
export class TimesheetService {
  constructor(
    @Inject('TIMESHEET_REPOSITORY')
    private timesheetRepository: typeof Timesheet,
  ) {}

  async createTimesheet(timesheet: Partial<Timesheet>): Promise<Timesheet> {
    const existingTimesheet = await this.timesheetRepository.findOne({
      where: { date: timesheet.date },
    });
    if (!existingTimesheet) {
      return await this.timesheetRepository.create(timesheet);
    } else {
      throw new BadRequestException('This timesheet already exists');
    }
  }
  async getEmployeeTimesheets(id: number): Promise<Timesheet[]> {
    return await this.timesheetRepository.findAll({
      where: { employeeId: id },
    });
  }
  async getAllTimesheets(): Promise<Timesheet[]> {
    return await this.timesheetRepository.findAll();
  }
  async getTimesheet(id: number): Promise<Timesheet> {
    const timesheet = await this.timesheetRepository.findOne({
      where: {
        id,
      },
    });
    if (!timesheet) throw new NotFoundException();
    return timesheet;
  }
  async deleteTimesheet(id: number): Promise<Timesheet> {
    const timesheet = await this.timesheetRepository.findOne({
      where: {
        id,
      },
    });
    if (!timesheet) throw new NotFoundException();
    await this.timesheetRepository.destroy({ where: { id } });
    return timesheet;
  }

  async updateTimesheet(
    updateTimesheet: UpdateTimesheetDto,
  ): Promise<Timesheet> {
    const { id, startTime, endTime, date } = updateTimesheet;
    const timesheet = await this.timesheetRepository.findOne({
      where: {
        id,
      },
    });
    if (!timesheet) throw new NotFoundException();

    if (date) timesheet.date = date;
    if (startTime) timesheet.startTime = startTime;
    if (endTime) timesheet.endTime = endTime;
    return timesheet.save();
  }
}
