import styled from "styled-components";

const Footer = styled.footer`
    background-color: #000000;
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.p`
    color: #FFFFFF;
`;

const Rodape = (props) => {

    return (
        <Footer>
            <Text>Feito por Felipe Alves — Instituto Infnet.</Text>
        </Footer>
    );

};

export default Rodape;