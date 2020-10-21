import { Profile, ProfileMigator } from "../models/Profile";
import { AxiosApiService } from "./base/AxiosApiService";

class ProfileService extends AxiosApiService<Profile>{
  constructor(){
    super('profiles/', ProfileMigator);
  }
}

export default new ProfileService();