import Ad from './ad';

export interface Tag {
  id: string;
  name: string;
  ads: Ad[];
}
