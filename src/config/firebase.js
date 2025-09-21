import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBj5TxhW8tXHXAYFfETDfXrS_I-o_3JTxc",
  authDomain: "termo-tienda.firebaseapp.com",
  projectId: "termo-tienda",
  storageBucket: "termo-tienda.firebasestorage.app",
  messagingSenderId: "698706189028",
  appId: "1:698706189028:web:1cfa8599a7b4332d7daaf1"
};

// Validación básica para evitar fallos si faltan variables
for (const [key, value] of Object.entries(firebaseConfig)) {
  if (!value) {

    console.warn(`[Firebase] Falta la variable de entorno: ${key}`);
  }
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
