import {
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeDto  {
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Field()
  email: string;

  @MinLength(4)
  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
@InputType()
export class UpdateEmployeeDto {
  @IsNotEmpty()
  @IsInt()
  @Field()
  id: number;
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  firstName: string;

  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  email: string;

  @MinLength(4)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  password: string;
}
