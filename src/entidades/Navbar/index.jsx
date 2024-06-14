import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #6681db;
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
    font-size: 1.4rem;
    background-color: black;
    padding: 10px;
    align-items: center;
    text-align: center;
`;

const Logo = styled.img`
    width: 80px;
`;

const Title = styled.h1`

`;

const Menu = styled.img`
    width: 80px;
    cursor: pointer;
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
`;

const linkStyle = {

    display: "flex",
    color: "black"

};

const Navbar = (props) => {

    const [toggleMenu, setToggleMenu] = useState(false);

    const handleMenu = () => { if (!toggleMenu) setToggleMenu(true); else setToggleMenu(false) };
    
    return (
        <>
            <Header>
                <Link className="linksMenu" style={ { ...linkStyle } }>
                    <Logo src="./src/assets/logo.svg" />
                    <Title>ACME</Title>
                </Link>
                <Menu onClick={handleMenu} src="/src/assets/menu.svg" />
                {toggleMenu && <>
                    <Blackspace onClick={handleMenu} />
                    <Nav>
                        <Link onClick={handleMenu} className="linksMenu linksNav" to="/fornecedores">Fornecedores e Contatos</Link>
                        <Link onClick={handleMenu} className="linksMenu linksNav" to="/produtos">Produtos e Cotações</Link>
                    </Nav>
                </> }
            </Header>
        </>
    );

};

export default Navbar;