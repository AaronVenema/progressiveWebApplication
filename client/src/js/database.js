import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const DB_VAR = await openDB('jate', 1);
  const TX_VAR = DB_VAR.transaction('jate', 'readwrite');
  const STORE_VAR = TX_VAR.objectStore('jate');
  const VAR_NAME = STORE_VAR.put({ id: 1, value: content });
  const result = await VAR_NAME;
  console.log('🚀 - data saved to the database', result.value);
};

export const getDb = async () => {
  const DB_VAR = await openDB('jate', 1);
  const TX_VAR = DB_VAR.transaction('jate', 'readonly');
  const STORE_VAR = TX_VAR.objectStore('jate')
  const request = STORE_VAR.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  return result?.value;
};

initdb();
