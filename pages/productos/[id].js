import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

import { FirebaseContext } from "@/firebase";
import { collection, getDoc, doc } from "firebase/firestore";

import Layout from "../../components/layout/Layout";
import Error404 from "@/components/layout/404";

const Producto = () => {
  // state del componente
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);

  // Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // context de firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const productoQuery = doc(collection(firebase.db, "productos"), id);

        const productoID = getDoc(productoQuery);

        if (productoID.exists) {
          setProducto(productoID.data());
        } else {
          setError(true);
        }
      };
      obtenerProducto();
    }
  }, [id]);

  return <Layout>{error && <Error404 />}</Layout>;
};

export default Producto;
