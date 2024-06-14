import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: 
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    display: none;
    gap: 10px;
`;

const Logo = styled.img`
    width: 80px;
`;

const Title = styled.h1`

`;

const Menu = styled.img`
    width: 80px;
`;

const linkStyle = {

    display: "flex"

};

const Navbar = (props) => {
    
    return (
        <>
            <Header>
                <Link className="linksMenu" style={ { ...linkStyle } }>
                    <Logo src="./src/assets/logo.svg" />
                    <Title>ACME</Title>
                </Link>
                <Menu src="/src/assets/menu.svg" />
                <Nav>
                    <Link className="linksMenu" to="/fornecedores">Fornecedores e Contatos</Link>
                    <Link className="linksMenu" to="/produtos">Produtos e Cotações</Link>
                </Nav>
            </Header>
        </>
    );

};

export default Navbar;