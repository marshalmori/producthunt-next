// import '@/styles/globals.css'
import "@/styles/app.css";
import App from "next/app";
import firebase, { FirebaseContext } from "../firebase";

export default function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
