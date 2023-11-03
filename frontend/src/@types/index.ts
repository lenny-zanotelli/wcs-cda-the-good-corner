export type CategoryProps = {
  id: number;
  name: string;
  getAllCategories: {
    id: number;
    name: string;
  }[]
};

export type AdCardProps = {
  id: number;
  title: string;
  picture: string;
  description: string;
  owner: string;
  price: number;
  location: string;
  category: {
    id: number;
    name: string;
  }
  ads: {
    id: number;
    name: string;
  },
  createdAt: string;
};
