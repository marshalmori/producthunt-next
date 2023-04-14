import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";
import Boton from "../ui/Boton";
import { Fragment } from "react";

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
`;

const Header = () => {
  const usuario = true;

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >
      <ContenedorHeader>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>

          <Buscar />

          <Navegacion />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {usuario ? (
            <Fragment>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hola: Marshal
              </p>

              <Boton bgColor={true}>Cerrar Sesión</Boton>
            </Fragment>
          ) : (
            <Fragment>
              <Link href="/login">
                <Boton bgColor={true}>Login</Boton>
              </Link>

              <Link href="/crear-cuenta">
                <Boton>Crear Cuenta</Boton>
              </Link>
            </Fragment>
          )}
        </div>
      </ContenedorHeader>
    </header>
  );
};

export default Header;