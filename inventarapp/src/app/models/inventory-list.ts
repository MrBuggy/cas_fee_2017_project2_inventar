import { InventoryListItem } from './inventory-list-item';

export class InventoryList {
  $key: string;
  name: string;
  hasWarning: boolean;
  items: InventoryListItem[];
  userID: string;
}
