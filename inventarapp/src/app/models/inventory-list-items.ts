import { InventoryListItem } from './inventory-list-item';

export const INVENTORY_LIST_ITEMS: InventoryListItem[] = [
  {
    $key: '1',
    name: 'Item 1',
    count: 15,
    hasWarning: false,
    value: 30
  },
  {
    $key: '2',
    name: 'Item 2',
    hasWarning: true,
    lending: {
      from: [
        {
          $key: '1',
          count: 1,
          name: 'Mr. Lending',
          lending: true
        },
        {
          $key: '2',
          count: 2,
          name: 'Mr. Lending 2.0',
          lending: true
        }
      ],
      to: [
        {
          $key: '1',
          count: 1,
          name: 'Mr. Lending 3.0',
          lending: true
        }
      ]
    },
    count: 7
  },
  {
    $key: '3',
    name: 'Item 3',
    hasWarning: false,
    count: 17
  },
  {
    $key: '4',
    name: 'Item 4',
    hasWarning: false,
    count: 4
  }
];
