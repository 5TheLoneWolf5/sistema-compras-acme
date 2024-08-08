import { Link } from "react-router-dom";

const Desconhecida = (props) => {

    return (
        <>
            <h1>Página Desconhecida</h1>
            <p><Link to="/">Clique aqui</Link> para retornar.</p>
        </>
    );

};

export default Desconhecida;