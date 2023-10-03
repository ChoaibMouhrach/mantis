import { ICategory } from "./category";

export interface IIssue {
  id: number;
  title: string;
  description: string | null;
  category_id: number;
  app_id: number;
  created_at: string;
  updated_at: string;
  category: ICategory;
  solved: boolean;
  labels: {
    id: number;
    value: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    pivot: {
      issue_id: number;
      label_id: number;
    };
  }[];
}
