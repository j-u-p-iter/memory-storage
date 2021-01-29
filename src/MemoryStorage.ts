export interface StorageItems {
  [key: string]: string;
}

export class MemoryStorage {
  constructor(private storage: StorageItems = {}) {}

  /**
   * Extracts and returns items from a storage.
   *
   */
  public read(keys: string[]) {
    return Object.entries(this.storage).reduce((result, [key, value]) => {
      if (keys.includes(key)) {
        return { ...result, [key]: value };
      }

      return result;
    }, {});
  }

  /**
   * Writes data into a storage.
   *
   */
  public write(data: StorageItems) {
    Object.entries(data).forEach(([key, value]) => {
      this.storage[key] = value;
    });
  }

  /**
   * Removes data from a storage.
   *
   */
  public delete(keys: string[]) {
    keys.forEach(key => {
      this.storage[key] = null;
    });
  }
}
