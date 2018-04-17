import { InventoryListItem } from './inventory-list-item';

export const INVENTORY_LIST_ITEMS: InventoryListItem[] = [
  {
    id: 1,
    name: "Item 1",
    count: 15,
    hasWarning: false,
    value: 30
  },
  {
    id: 2,
    name: "Item 2",
    hasWarning: true,
    lending: {
      from: [
        {
          id: 1,
          count: 1,
          name: "Mr. Lending",
          lending: true
        },
        {
          id: 2,
          count: 2,
          name: "Mr. Lending 2.0",
          lending: true
        }
      ],
      to: [
        {
          id: 1,
          count: 1,
          name: "Mr. Lending 3.0",
          lending: true
        }
      ]
    },
    count: 7
  },
  {
    id: 3,
    name: "Item 3",
    hasWarning: false,
    count: 17
  },
  {
    id: 4,
    name: "Item 4",
    hasWarning: false,
    count: 4
  }
]
