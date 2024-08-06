// Import the functions you need from the SDKs you need
import {getApps, initializeApp} from "firebase/app";
import {getFirestore, connectFirestoreEmulator, Firestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
type firebaseConfigProps = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

type EmulatorServices = {
  firestore: Firestore;
};

const firebaseConfig: firebaseConfigProps = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID!,
};

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);

  return {firebaseApp, firestore, isConfigured};
}

function connectToEmulators({firestore}: EmulatorServices) {
  if (process.env.NODE_ENV! != "production") {
    connectFirestoreEmulator(firestore, "localhost", 8080);
  }
}

export function getFirebase() {
  const services = initializeServices();

  if (!services.isConfigured) {
    connectToEmulators(services);
  }

  return services;
}
