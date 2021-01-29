import { MemoryStorage } from '.';


describe('MemoryStorage', () => {
  it('writes, reads and deletes data properly', () => {
    const memoryStorage = new MemoryStorage();

    memoryStorage.write({ 
      key1: 'value1', 
      key2: 'value2',
    });

    expect(memoryStorage.read(['key1', 'key2'])).toEqual({
      key1: 'value1',
      key2: 'value2',
    });

    memoryStorage.delete(['key1']);

    expect(memoryStorage.read(['key2'])).toEqual({
      key2: 'value2',
    });
  });

  it('provides consistent api to work with third party object based storages', () => {
    const dataStore = {};

    const memoryStorage = new MemoryStorage(dataStore);

    memoryStorage.write({ 
      key1: 'value1', 
      key2: 'value2',
    });

    expect(memoryStorage.read(['key1', 'key2'])).toEqual({
      key1: 'value1',
      key2: 'value2',
    });

    expect(dataStore).toEqual({
      key1: 'value1', 
      key2: 'value2',
    });

    memoryStorage.delete(['key1']);

    expect(memoryStorage.read(['key2'])).toEqual({
      key2: 'value2',
    });

    expect(dataStore).toEqual({
      key1: null, 
      key2: 'value2',
    });
  });
});
