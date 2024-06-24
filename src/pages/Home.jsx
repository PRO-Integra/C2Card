import React from "react";
import { useSelector } from "react-redux";
import { Container} from "react-bootstrap";
import Passo1 from "../components/passos/Passo1";
import Passo2 from "../components/passos/Passo2";
import MenuPassos from "../components/MenuPassos";

const Home = () => {

  const passos = useSelector((state) => state.app.passos);
  const passoAtivo = passos.find((passo) => passo.ativo);
  const nomeView = passoAtivo.nome;
  
  return (
    <Container>
      {/*switch case para menu dos passos*/ }
      <MenuPassos />  {/*componente que renderiza o menu de superior de passos*/}
      {(() => {
        switch (nomeView) {
          case "Passo 1":
            return <Passo1 />;  {/*componente que renderiza o passo 1 com a listagem e cadastro*/}
          case "Passo 2":
            return <Passo2 />;   {/*componente que renderiza o aviso de em breve para cada passo*/}
          case "Passo 3":     
            return <Passo2 />;
          case "Passo 4":
            return <Passo2 />;
          case "Passo 5":
            return <Passo2 />;
          case "Passo 6":
            return <Passo2 />;
          case "Passo 7":
            return <Passo2 />;
          case "Passo 8":
            return <Passo2 />;
          case "Passo 8":
             return <Passo2 />;
          case "Passo 9":
              return <Passo2 />;
          default:
             return null;
        }
      })()}
    </Container>
  );
};

export default Home;
