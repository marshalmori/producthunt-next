const DetallesProducto = ({ producto }) => {
  const {
    id,
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
    <li>
      <div>
        <div></div>
        <div>
          <h1>{nombre}</h1>
        </div>
      </div>
      <div></div>
    </li>
  );
};

export default DetallesProducto;
