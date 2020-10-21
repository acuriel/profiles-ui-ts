export type ResponseMigrator<Model> = (data: any | any[]) => Model;

export type RequestMigrator<Model> = (data: Model) => any;

export interface IMigrator<Model> {
  fromResponse: ResponseMigrator<Model>;
  fromRequest: RequestMigrator<Model>;
}
