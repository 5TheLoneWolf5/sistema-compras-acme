import { Outlet } from "react-router-dom";
import Rodape from "../Rodape";
import Navbar from "../Navbar";

const Home = (props) => {

    return (
        <>
            <div id="header-and-main">
                <Navbar sizes={props.sizes} />
                <h1>Bem vindos ao sistema de compras da ACME!</h1>
                <Outlet />
            </div>
            <Rodape />
        </>
    );

};

export default Home;