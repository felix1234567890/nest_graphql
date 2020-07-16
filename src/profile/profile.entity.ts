import {
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Table,
} from 'sequelize-typescript';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/employee.entity';

@Table({ tableName: 'profiles', paranoid: false })
@ObjectType()
export class Profile extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Field(type => ID)
  id: number;

  @AllowNull(false)
  @Column
  @Field()
  name: string;

  @ForeignKey(() => Employee)
  @Column
  employeeId: number;

  @BelongsTo(() => Employee)
  @Field(type => Employee)
  employee: Employee;
}
