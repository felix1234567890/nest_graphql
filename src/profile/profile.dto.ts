import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsNotEmpty, IsString, IsInt } from 'class-validator';

@InputType()
export class ProfileDto {
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Field()
  employeeId: number;
}
