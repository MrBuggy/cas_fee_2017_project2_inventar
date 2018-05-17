import { LendingObject } from './lendig-object';

export class InventoryListItem {
  $key: string;
  name: string;
  count: number;
  hasWarning: boolean;
  lending?: LendingObject;
  value?: number;
  photo?: string;
  listID: string;
  rating?: number;
  userID: string;
  userRated?: Array<string>;
  userMail?: string;
  userName?: string;
}
