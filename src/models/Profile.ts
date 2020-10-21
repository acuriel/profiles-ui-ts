import { IMigrator } from "./base/migration";

export type ProfileData = {
  id?: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
};

export class Profile {
  public id: number | undefined = undefined;
  public firstName: string = "";
  public lastName: string = "";
  public birthDate: Date = new Date(Date.now());
  constructor(data?: ProfileData) {
    if (data) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.birthDate = data.birthDate;
    }
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public static getEmpty() {
    return new Profile();
  }
}

export const ProfileMigator: IMigrator<Profile> = {
  fromResponse: (data) => {
    return {
      id: data.id,
      firstName: data.firstname,
      lastName: data.lastname,
      birthDate: new Date(data.birthdate),
    } as Profile;
  },
  fromRequest: (entity) => {
    return {
      firstname: entity.firstName,
      lastname: entity.lastName,
      birthdate: entity.birthDate.toISOString().substring(0, 10),
    };
  },
};
