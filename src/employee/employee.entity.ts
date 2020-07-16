import {
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  IsEmail,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  Unique,
  BeforeUpdate,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import * as crypto from 'crypto';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Profile } from 'src/profile/profile.entity';
import { Timesheet } from 'src/timesheet/timesheet.entity';

@Table({ tableName: 'employees', paranoid: false })
@ObjectType()
export class Employee extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Field(type => ID)
  id: number;

  @AllowNull(false)
  @Column
  @Field()
  firstName: string;

  @AllowNull(false)
  @Column
  @Field()
  lastName: string;

  @IsEmail
  @Unique
  @AllowNull(false)
  @Column
  @Field()
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasOne(() => Profile)
  @Field(() => Profile, { nullable: true })
  profileImage: Profile;

  @HasMany(() => Timesheet)
  @Field(() => [Timesheet])
  timesheets: Timesheet[];

  @BeforeCreate
  @BeforeUpdate
  static hashPassword(employee: Employee) {
    employee.password = crypto
      .createHmac('sha256', employee.password)
      .digest('hex');
  }
}
