import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "../../componentes/Icon";
import { signOut } from "firebase/auth";
import AuthContext from "../../contexts/AuthContext";

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #d3d3d3;
    border-radius: 5px;
    padding: 5px;
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    // display: none;
    gap: 15px;
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    // line-height: 100vh;
    width: 40vw;
    background-color: black;
    padding: 10px;
    z-index: 1;
    align-items: center;
    text-align: center;
    font-size: 0.9rem;
    transform: translateX(100%);
    overflow-y: auto;
    @media (min-width: ${(props) => props.sizes.small}) {
        font-size: 1.2rem;
        position: static;
        background-color: none;
        height: fit-content;
        // width: fit-content;
        flex-direction: row;
        border-radius: 2px;
        flex-wrap: wrap;
    }
`;

const Title = styled.h1`

`;

const Menu = styled.img`
    width: 80px;
    cursor: pointer;
    background-color: white;

    @media (min-width: ${(props) => props.sizes.small}) {
        display: none;
    }

`;

const Blackspace = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: black;
    opacity: 0.5;
    z-index: 1;
    left: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;

    html {
        overflow-y: hidden;
    }


    @media (min-width: ${(props) => props.sizes.small}) {
        display: none;
    }
`;
const linkStyle = {

    display: "flex",
    justifyContent: "space-around",
    color: "black",
    backgroundColor: "white",
    borderRadius: "2px",
    padding: "0px 15px",
    gap: "10px",
    
};

const Navbar = (props) => {

    const [toggleMenu, setToggleMenu] = useState(false);
    // const screenSize = window.matchMedia(`(min-width: ${props.sizes.small})`).matches;
    const [screenSize, setScreenSize] = useState(window.matchMedia(`(min-width: ${props.sizes.small})`).matches);
    const [wasMenu, setWasMenu] = useState(false);

    const auth = useContext(AuthContext);

    useEffect(() => {
        
        document.body.classList.remove("bodyScrollX");
        document.body.classList.add("removeScroll");

        window.matchMedia(`(min-width: ${props.sizes.small})`).addEventListener("change", e => setScreenSize(e.matches));
        setToggleMenu(false);

    }, []);

    useEffect(() => {
        
        if (toggleMenu && wasMenu) {

            document.body.classList.remove("bodyScrollX");
            document.body.classList.add("removeScroll");
            window.scrollTo(0, 0);

        } else {

            document.body.classList.add("bodyScrollX");
            document.body.classList.remove("removeScroll");

        }

    }, [toggleMenu]);

    const handleMenu = (e) => { 
        
        // console.log(e.target.id);
        e.target.id === "menu" ? setWasMenu(true) : setWasMenu(false);

        if (!toggleMenu) {
        
            setToggleMenu(true);

        } else {

            setToggleMenu(false);

        }
    };

    const handleSignOut = () => {

        signOut(props.auth);
        auth.setUserAuth((data) => { 
            return {
            ...data,
            isLogged: false,
            email: "",
        }});
        
        props.navigate("/login");

    };
    
    return (
        <>
            <Header>
                <Link className="linksMenu imgsHeader" style={ { ...linkStyle } } to="/">
                    <Icon width={60} src="./src/assets/logo.svg" />
                    <Title className="title">ACME</Title>
                </Link>
                <div className="imgsHeader">
                    <Menu id="menu" onClick={handleMenu} src="/src/assets/menu.svg" sizes={props.sizes} />
                </div>
                {(toggleMenu || screenSize) && <>
                    <Blackspace onClick={handleMenu} sizes={props.sizes} />
                    <Nav className="slideIn" sizes={props.sizes}>
                        { auth.userAuth.role === "admin" &&
                        <>
                            <Link onClick={handleMenu} className="linksMenu linksNav" to="/compras">Compras</Link>
                            <Link onClick={handleMenu} className="linksMenu linksNav" to="/produtos">Produtos</Link>
                            <Link onClick={handleMenu} className="linksMenu linksNav" to="/fornecedores">Fornecedores</Link>
                            <Link onClick={handleMenu} className="linksMenu linksNav" to="/contatos">Contatos</Link>
                        </>} 
                        <Link onClick={handleMenu} className="linksMenu linksNav" to="/requisicoes">Requisições e Cotações</Link>
                        <Link onClick={handleMenu} className="linksMenu linksNav settingsNav" to="/configuracoes" title="Configurações"><Icon width={60} src="./src/assets/settings.svg" /></Link>
                        <span onClick={handleSignOut} className="linksMenu linksNav sairNav">Sair</span>
                    </Nav>
                </> }
            </Header>
        </>
    );

};

export default Navbar;