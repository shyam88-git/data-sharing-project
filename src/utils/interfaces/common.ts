export type StringArrayType = string[];
export type DynamicObjectType = {
  [key: string]: any;
};

export type DynamicObjectArrayType = DynamicObjectType[];

export interface SelectTypeI {
  label: string;
  value: string;
}

export interface SearchParamsI {
  search?: string;
  page: number;
  per_page: number | string;
  filter?: DynamicObjectArrayType | null;
}
