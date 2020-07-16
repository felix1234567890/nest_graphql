import {
  Resolver,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { EmployeeService } from 'src/employee/employee.service';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream, ReadStream } from 'fs';
import { ProfileService } from './profile.service';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}

@Resolver(of => Profile)
export class ProfileResolver {
  constructor(
    private employeeService: EmployeeService,
    private profileService: ProfileService,
  ) {}
  @Mutation(returns => Boolean, { nullable: true })
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', async () => {
          await this.profileService.createProfile({
            name: filename,
            employeeId: id,
          });
          resolve(true);
        })
        .on('error', () => {
          reject(false);
        });
    });
  }
  @Mutation(() => Profile)
  deleteProfile(@Args('id', { type: () => Int }) id: number): Promise<Profile> {
    return this.profileService.deleteProfile(id);
  }
  @Query(returns => [Profile])
  async getProfiles(): Promise<Profile[]> {
    return await this.profileService.getProfiles();
  }
  @Query(() => Profile, { nullable: true })
  async profile(@Args('id', { type: () => Int }) id: number) {
    return await this.profileService.getProfile(id);
  }
  @ResolveField()
  async employee(@Parent() profile: Profile) {
    const { employeeId } = profile;
    return await this.employeeService.getEmployee(employeeId);
  }
}
