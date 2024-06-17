import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    width: 40vw;
    background-color: black;
    padding: 10px;
    align-items: center;
    text-align: center;
    font-size: 0.9rem;
    transform: translateX(100%);
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

const Logo = styled.img`
    width: 80px;
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
    width: 60vw;
    height: 100vh;
    position: absolute;
    background-color: black;
    opacity: 0.5;
    left: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
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

    useEffect(() => {
        
        window.matchMedia(`(min-width: ${props.sizes.small})`).addEventListener("change", e => setScreenSize(e.matches));
        setToggleMenu(false);

    }, []);

    const handleMenu = () => { if (!toggleMenu) setToggleMenu(true); else setToggleMenu(false) };
    
    return (
        <>
            <Header>
                <Link className="linksMenu" style={ { ...linkStyle } } to="/">
                    <Logo src="./src/assets/logo.svg" />
                    <Title>ACME</Title>
                </Link>
                <Menu id="menu" onClick={handleMenu} src="/src/assets/menu.svg" sizes={props.sizes} />
                {(toggleMenu || screenSize) && <>
                    <Blackspace onClick={handleMenu} sizes={props.sizes} />
                    <Nav className="slideIn" sizes={props.sizes}>
                        <Link onClick={handleMenu} className="linksMenu linksNav" to="/produtos">Produtos</Link>
                        <Link onClick={handleMenu} className="linksMenu linksNav" to="/cotacoes">Cotações</Link>
                        <Link onClick={handleMenu} className="linksMenu linksNav" to="/fornecedores">Fornecedores</Link>
                        <Link onClick={handleMenu} className="linksMenu linksNav" to="/contatos">Contatos</Link>
                    </Nav>
                </> }
            </Header>
        </>
    );

};

export default Navbar;