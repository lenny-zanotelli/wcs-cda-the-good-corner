export type Category = {
  id: number;
  name: string;
};

export type Ad = {
  id: number;
  title: string;
  picture: string;
  description: string;
  owner: string;
  price: number;
  location: string;
  category: Category | undefined,
  tags: {
    id: number;
    name: string;
  },
  createdAt: string;
};
