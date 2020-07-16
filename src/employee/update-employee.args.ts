import { Field, InputType } from '@nestjs/graphql';
import { EmployeeDto } from './employee.dto';

@InputType()
export class UpdateEmployeeArgs {
  @Field()
  id: number;

  @Field()
  employee: EmployeeDto;
}
