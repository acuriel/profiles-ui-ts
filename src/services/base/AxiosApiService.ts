import { IMigrator } from "../../models/base/migration";
import IModelRepository from "./IModelRepository";
import axios, { AxiosRequestConfig } from "axios";

const PORT = 8000;
const BASE_URL = `http://localhost:${PORT}`;

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
};

export const baseService = axios.create(axiosConfig);

export class AxiosApiService<Model> implements IModelRepository<Model> {
  constructor(
    protected entityUrl: string,
    protected migrator: IMigrator<Model>
  ) {}

  async getAll(): Promise<Model[]> {
    try {
      const { data } = await baseService.get<any[]>(this.entityUrl);
      return data.map((entity) => this.migrator.fromResponse(entity));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getById(id: number): Promise<Model> {
    try {
      const { data } = await baseService.get(this.entityUrl + id);
      return this.migrator.fromResponse(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async create(entity: Model): Promise<Model> {
    try {
      const obj = this.migrator.fromRequest(entity);
      const { data } = await baseService.post(this.entityUrl, obj);
      return this.migrator.fromResponse(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async update(id: number, entity: Model): Promise<Model> {
    try {
      const obj = this.migrator.fromRequest(entity);
      const { data } = await baseService.put(this.entityUrl + id + "/", obj);
      return this.migrator.fromResponse(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async delete(id: number): Promise<void> {
    try {
      await baseService.delete(this.entityUrl + id + "/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
