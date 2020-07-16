import {
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/employee.entity';

@Table({ tableName: 'timesheets' })
@ObjectType()
export class Timesheet extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Field(type => ID)
  id: number;

  @Column(DataType.DATE)
  @Field()
  date: Date;

  @Column(DataType.DATE)
  @Field()
  startTime: Date;

  @Column(DataType.DATE)
  @Field()
  endTime: Date;

  @ForeignKey(() => Employee)
  @Column
  employeeId: number;

  @BelongsTo(() => Employee)
  @Field(type => Employee)
  employee: Employee;
}
