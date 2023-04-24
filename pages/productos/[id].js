import { useEffect, useContext, useState, Fragment } from "react";
import { useRouter } from "next/router";

import { FirebaseContext } from "@/firebase";
import { collection, getDoc, doc } from "firebase/firestore";

import Layout from "../../components/layout/Layout";
import Error404 from "@/components/layout/404";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

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
    console.log(id);
    if (id) {
      const obtenerProducto = async () => {
        const productoQuery = await doc(
          collection(firebase.db, "productos"),
          id
        );

        const producto = await getDoc(productoQuery);

        if (producto.exists()) {
          setProducto(producto.data());
        } else {
          setError(true);
        }
      };
      obtenerProducto();
    }
  }, [id]);

  //   if (Object.keys(producto).length === 0) return "Cargando...";

  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    URLImage: urlimagen,
    votos,
  } = producto;

  return (
    <Layout>
      <Fragment>
        {error && <Error404 />}
        <div className="contenedor">
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            {nombre}
          </h1>

          <ContenedorProducto>
            <div>1</div>
            <aside>2</aside>
          </ContenedorProducto>
        </div>
      </Fragment>
    </Layout>
  );
};

export default Producto;
