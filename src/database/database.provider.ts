import { Sequelize } from 'sequelize-typescript';
import { Employee } from 'src/employee/employee.entity';
import { Profile } from 'src/profile/profile.entity';
import { Timesheet } from 'src/timesheet/timesheet.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'frane',
        database: 'emp',
        timezone: '+02:00',
      });
      sequelize.addModels([Employee, Profile, Timesheet]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
