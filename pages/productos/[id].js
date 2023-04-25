import { useEffect, useContext, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "@/firebase";
import {
  collection,
  getDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import Layout from "../../components/layout/Layout";
import Error404 from "@/components/layout/404";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Campo, InputSubmit } from "@/components/ui/Fomulario";
import Boton from "@/components/ui/Boton";

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
  const [comentario, guardarComentario] = useState({});

  // Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // context de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

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
  }, [id, producto]);

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
    creador,
    haVotado,
  } = producto;

  const votarProducto = () => {
    if (!usuario) {
      return router.push("/login");
    }

    //obtener y sumar un nuevo voto
    const nuevoTotal = votos + 1;

    // Verificar si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) return;

    // guardar el ID del usuario que ha votado
    const nuevoHaVotado = [...haVotado, usuario.uid];

    // Actualizar en la BD
    const docRef = doc(collection(firebase.db, "productos"), id);
    updateDoc(docRef, {
      votos: increment(nuevoTotal),
      haVotado: nuevoHaVotado,
    });

    // Actualizar el state
    setProducto({
      ...producto,
      votos: nuevoTotal,
    });
  };

  // Funciones para crear comentarios
  const comentarioChange = (e) => {
    guardarComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  const agregarComentario = (e) => {
    e.preventDefault();

    if (!usuario) {
      return router.push("/login");
    }

    // información extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    // Tomar copia de comentarios y agregarlos al arreglo
    const nuevosComentarios = [...comentarios, comentario];

    // Actualizar la BD
    const docRef = doc(collection(firebase.db, "productos"), id);
    updateDoc(docRef, {
      comentarios: nuevosComentarios,
    });

    // Actualizar el state
    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });
  };

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
            <div>
              <p>
                Publicado hace:{" "}
                {creado ? formatDistanceToNow(new Date(creado)) : null}
              </p>
              <p>
                Por: {creador?.nombre} de {empresa}
              </p>
              <img src={urlimagen} />
              <p>{descripcion}</p>

              {usuario && (
                <Fragment>
                  <h2>Agrega tu comentario</h2>
                  <form onSubmit={agregarComentario}>
                    <Campo>
                      <input
                        type="text"
                        name="mensaje"
                        onChange={comentarioChange}
                      />
                    </Campo>
                    <InputSubmit type="submit" value="Agregar Comentario" />
                  </form>
                </Fragment>
              )}

              <h2
                css={css`
                  margin: 2rem 0;
                `}
              >
                Comentarios
              </h2>

              {comentarios?.length === 0 ? (
                "Aún no hay comentarios"
              ) : (
                <ul>
                  {comentarios?.map((comentario, idx) => (
                    <li
                      key={`${comentario.usuarioId}-${idx}`}
                      css={css`
                        border: 1px solid #e1e1e1;
                        padding: 2rem;
                      `}
                    >
                      <p>{comentario.mensaje}</p>
                      <p>
                        Escrito por:{" "}
                        <span
                          css={css`
                            font-weight: bold;
                          `}
                        >
                          {" "}
                          {comentario.usuarioNombre}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <aside>
              <Boton target="_blank" bgColor="true" href={url}>
                Visitar URL
              </Boton>

              <div
                css={css`
                  margin-top: 5rem;
                `}
              >
                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  {votos} Votos
                </p>

                {usuario && <Boton onClick={votarProducto}>Votar</Boton>}
              </div>
            </aside>
          </ContenedorProducto>
        </div>
      </Fragment>
    </Layout>
  );
};

export default Producto;
