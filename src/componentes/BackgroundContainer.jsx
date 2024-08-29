import styled from "styled-components";

const BackgroundContainerElement = styled.div`

    width: 100%;
    min-height: 85vh;
    margin: 5px 0;
    padding: 10px;
    background-image: url("./src/assets/background.jpg");
    background-repeat: repeat;
    display: flex;
    align-items: center;

`;

const BackgroundContainer = (props) => {
    // console.log(props.children);
    return (
        <BackgroundContainerElement {...props}>
            {props.children}
        </BackgroundContainerElement>
    );

};

export default BackgroundContainer;