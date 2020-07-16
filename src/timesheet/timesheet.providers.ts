import { Timesheet } from './timesheet.entity';

export const timesheetProviders = [
  {
    provide: 'TIMESHEET_REPOSITORY',
    useValue: Timesheet,
  },
];
