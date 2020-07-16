import { IsNotEmpty, IsDate, IsInt, IsOptional } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class TimesheetDto {
  @IsNotEmpty()
  @IsDate()
  @Field()
  date: Date;

  @IsNotEmpty()
  @Field()
  startTime: Date;

  @IsNotEmpty()
  @Field()
  endTime: Date;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  employeeId: number;
}

@InputType()
export class UpdateTimesheetDto {
  @IsOptional()
  @Field({ nullable: true })
  date?: Date;

  @IsOptional()
  @Field({ nullable: true })
  startTime?: Date;

  @IsOptional()
  @Field({ nullable: true })
  endTime?: Date;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  id: number;
}
