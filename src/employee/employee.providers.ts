import { Employee } from './employee.entity';

export const employeeProviders = [
  {
    provide: 'EMPLOYEE_REPOSITORY',
    useValue: Employee,
  },
];
