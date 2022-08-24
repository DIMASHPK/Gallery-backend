export type ListItemImageType = {
  id: number;
  size: number;
  src: string;
  name: string;
  list_id: number;
};

export type ListItemType = {
  id: number;
  name: string;
  size: number;
  date: string;
  description: string;
  images: ListItemImageType[];
};
