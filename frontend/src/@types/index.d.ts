export type CategoryProps = {
  id: number;
  name: string;
  onClick?: () => void;
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
  createdAt: string;
};
