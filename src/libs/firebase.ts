import * as firebase from 'firebase/app';
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
} from 'firebase/firestore';

const firebaseConfig: firebase.FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const initializeApp = (): firebase.FirebaseApp | undefined => {
  if (firebase.getApps().length) return;

  return firebase.initializeApp(firebaseConfig);
};

export const createCollection = <T = DocumentData>(
  path: string,
): CollectionReference<T> => {
  const fireStore = getFirestore(initializeApp());

  return collection(fireStore, path) as CollectionReference<T>;
};
