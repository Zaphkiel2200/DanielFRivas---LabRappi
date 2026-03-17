export interface Store {
  id: number;
  name: string;
}

export class StoreService {
  private stores: Store[] = [
    { id: 1, name: 'Burger Palace' },
    { id: 2, name: 'Luigi Pizza' }
  ];

  getStores(): Store[] {
    return this.stores;
  }
}
