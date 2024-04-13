const EXPIRATION_TIME = 24 * 60 * 60; // 24hours

interface StoredItemI {
  value: any;
  expiration: number;
}

export enum IBucketKeyEnums {
  TOKEN = "data_sharing_token",
  REFRESH_TOKEN = "data_sharing_refresh_token",
  ID = "data_sharing_userId",
  ACTIVE_USER = "data_sharing_active_user",
  ACTIVE_USER_EMAIL = "data_sharing_active_user_email",
  ACTIVE_GISFILE = "data_sharing_active_gis_file",
}

interface IBucket {
  get: (key: IBucketKeyEnums) => string | null;
  set: (key: IBucketKeyEnums, value: string) => void;
  remove: (key: IBucketKeyEnums) => void;
  clear: () => void;
}

const getTokenWithExpiration = (key: string): string | null => {
  const itemString: string | null = localStorage.getItem(key);

  if (!itemString) {
    return null;
  }

  const parsedItem: StoredItemI = JSON.parse(itemString);

  if (parsedItem.expiration && new Date().getTime() > parsedItem.expiration) {
    localStorage.removeItem(key);
    return null;
  }

  return parsedItem.value;
};

class Bucket implements IBucket {
  get(key: IBucketKeyEnums) {
    return getTokenWithExpiration(key);
  }
  set(key: IBucketKeyEnums, value: string) {
    const item: StoredItemI = {
      value: value,
      expiration: new Date().getTime() + EXPIRATION_TIME * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  remove(key: IBucketKeyEnums) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

export const bucket = new Bucket();

const getToken = () => getTokenWithExpiration(IBucketKeyEnums.TOKEN) || null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;
