import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Profile } from './profile.entity';
import { ProfileDto } from './profile.dto';
import { readdir, unlink } from 'fs';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('PROFILE_REPOSITORY') private profileRepository: typeof Profile,
  ) {}
  async createProfile(profile: ProfileDto): Promise<Profile> {
    return await this.profileRepository.create(profile);
  }
  async getProfiles(): Promise<Profile[]> {
    return await this.profileRepository.findAll();
  }
  async getEmployeeProfile(id: number): Promise<Profile> {
    return await this.profileRepository.findOne({
      where: {
        employeeId: id,
      },
    });
  }
  async getProfile(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: {
        id,
      },
    });
    if (!profile) throw new NotFoundException();
    return profile;
  }
  async deleteProfile(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: {
        id,
      },
    });

    if (!profile) throw new NotFoundException();

    readdir('uploads', (err, files) => {
      if (err) throw new Error(err.message);
      for (const file of files) {
        if (file === profile.name) {
          unlink(`uploads/${file}`, err => {
            if (err) throw err;
          });
        }
      }
    });
    await this.profileRepository.destroy({ where: { id } });
    return profile;
  }
}
