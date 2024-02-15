/* eslint-disable import/no-cycle */
import Ad from './ad';

export interface Category {
  id: string;
  name: string;
  ads: Ad[];
}
