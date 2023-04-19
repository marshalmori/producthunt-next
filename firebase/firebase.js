//import app from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "@firebase/auth";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  //Registra un usuario
  async registrar(nombre, email, password) {
    const nuevoUsuario = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    return await updateProfile(this.auth.currentUser, {
      displayName: nombre,
    });
  }

  // Inicia sesión del usuario
  async login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}

const firebase = new Firebase();
export default firebase;

// const firebase = async ({ nombre, email, password }) => {
//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);

//   try {
//     const createdUser = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     console.log(createdUser);
//     return await createdUser.user.updateProfile.displayName({
//       displayName: nombre,
//     });
//   } catch (error) {
//     console.log(error.code);
//     console.log(error.message);
//   }
// };
