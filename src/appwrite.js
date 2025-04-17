import { Client, Databases, Storage, ID, Query } from 'appwrite';

const client = new Client();
client.setProject('67efdbc8003bcb27bcaf');

export const databases = new Databases(client);
export const storage = new Storage(client);
export const databaseId = "67efdc570033ac52dd43";   // Remplacez par l'ID de votre base de données
export const collectionId = "67f04e7200176527757a"; // Remplacez par l'ID de votre collection
export const ecolesCollectionId = "67f727d60008a5965d9e";
export const filieresCollectionId = "67f728960028e33b576a";
export const uesCollectionId = "67f72a8f00239ccc2b36";
export const bucketId = "67efdc26000acfe7e2ea";       // Remplacez par l'ID de votre bucket
export { ID, Query };