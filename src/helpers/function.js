import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage = EncryptStorage(process.env.VUE_APP_SECRET_KEY, {
  storageType: 'localStorage'
});