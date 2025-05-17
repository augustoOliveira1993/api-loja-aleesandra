export interface IModelPopulated {
  path: string;
  select?: string;
  populate?: IModelPopulated[];
}
