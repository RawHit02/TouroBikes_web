type StorageType = "session" | "local";
type UseStorageReturnValue = {
  getItem: (key: string, type?: StorageType) => string;
  setItem: (key: string, value: string, type?: StorageType) => boolean;
  removeItem: (key: string, type?: StorageType) => void;
  clearAll: (type?: StorageType) => void;
  getKeys: (type?: StorageType) => string[];
};

const localSessionStorage = (): UseStorageReturnValue => {
  const storageType = (type?: StorageType): "localStorage" | "sessionStorage" =>
    `${type ?? "session"}Storage`;

  const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();

  const getItem = (key: string, type?: StorageType): string => {
    return isBrowser ? window[storageType(type)][key] : "";
  };

  const setItem = (key: string, value: string, type?: StorageType): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value);
      return true;
    }

    return false;
  };

  const removeItem = (key: string, type?: StorageType): void => {
    window[storageType(type)].removeItem(key);
  };
  const clearAll = (type?: StorageType): void => {
    window[storageType(type)].clear();
  };

  const getKeys = (type?: StorageType): string[] => {
    let keys: string[] = [];
    if (isBrowser) {
      for (let i = 0; i < window[storageType(type)].length; i++) {
        keys.push(window[storageType(type)].key(i) ?? "");
      }
    }

    return keys;
  };
  return {
    getItem,
    setItem,
    removeItem,
    clearAll,
    getKeys,
  };
};

export default localSessionStorage;
