import { action, observable, runInAction } from "mobx";
import { Profile } from "../../../models/Profile";
import IModelRepository from "../../../services/base/IModelRepository";

export default class ProfileListStore{
  profiles = observable<Profile>([])
  editingProfile = observable<Profile>(Profile.getEmpty());
  
  constructor(protected profileService:IModelRepository<Profile>){}

  @action
  fetchProfiles = async () => {
    try {
      const profiles = await this.profileService.getAll();
      runInAction(() => {
        this.profiles.replace(profiles);
      })
    } catch (error) {
      console.log(error);
    }
  }

  save = async(profile:Profile) => {
    try {
      await (profile.id 
        ? this.profileService.update(profile.id, profile) 
        : this.profileService.create(profile));
      this.fetchProfiles();
    } catch (error) {
      console.log(error);
    }
  }

  delete = async(profile:Profile) => {
    try {
      if(profile.id){
        await this.profileService.delete(profile.id);
        this.fetchProfiles();
      }
    } catch (error) {
      console.log(error);
    }
  }

  @action
  setEditingProfile = (profile:Profile) => this.editingProfile = profile; 

  static newProfile = () => Profile.getEmpty();
}