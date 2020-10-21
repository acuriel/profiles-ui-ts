export default interface IModelRepository<Model> {
  getAll(): Promise<Model[]>;
  getById(id: number): Promise<Model>;
  create(entity: Model): Promise<Model>;
  update(id: number, entity: Model): Promise<Model>;
  delete(id: number): Promise<void>;
}
