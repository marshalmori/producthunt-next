import app from "firebase/compat/app";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
  }

  // Registra un usuario
  registrar(nombre, email, password) {}
}

const firebase = new Firebase();
export default firebase;
