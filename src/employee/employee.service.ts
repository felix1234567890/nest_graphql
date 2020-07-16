import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeDto, UpdateEmployeeDto } from './employee.dto';
import { Timesheet } from 'src/timesheet/timesheet.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY') private employeeRepository: typeof Employee,
  ) {}
  getEmployees(): Promise<Employee[]> {
    return this.employeeRepository.findAll<Employee>();
  }
  async getEmployee(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: {
        id,
      },
    });
    if (!employee) throw new NotFoundException();
    return employee;
  }
  async createEmployee(employee: EmployeeDto): Promise<Employee> {
    try {
      return await this.employeeRepository.create(employee);
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async deleteEmployee(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: {
        id,
      },
    });
    if (!employee) throw new NotFoundException();
    await this.employeeRepository.destroy({ where: { id } });
    return employee;
  }
  async updateEmployee(updateEmployee: UpdateEmployeeDto): Promise<Employee> {
    const { id, firstName, lastName, email, password } = updateEmployee;
    const employee = await this.employeeRepository.findOne({
      where: {
        id,
      },
    });
    if (!employee) throw new NotFoundException();
    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (email) employee.email = email;
    if (password) employee.password = password;
    return employee.save();
  }
}
