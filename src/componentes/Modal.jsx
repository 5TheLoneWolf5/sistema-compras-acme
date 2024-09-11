import { useEffect } from "react";
import styled from "styled-components";

const BackgroundModal = styled.div`

    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    backdrop-filter: blur(5px);
    // filter: blur(4px);

`;

const ModalContainer = styled.div`

    width: fit-content;
    max-width: 90%;
    min-width: 250px;
    max-height: 90%; /* So there can be some space for the user to click out of the modal. */
    min-height: 80px;
    // width: max(250px);
    // height: min(100px);
    border-radius: 4px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 15px;
    gap: 15px;
    overflow-y: auto;

`;

const CloseButton = styled.img`

    width: 30px;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    z-index: 3;

`;

const Modal = (props) => {

    useEffect(() => {
        
        if (props.activateModal) {
            document.body.classList.remove("bodyScrollX");
            document.body.classList.add("removeScroll");
            window.scrollTo(0, 0);

        }
        
    }, [props.activateModal]);

    const handleClick = () => {

        document.body.classList.add("bodyScrollX");
        document.body.classList.remove("removeScroll");
        // Statements above need to be executed before state is changed to false. Otherwise, the component itself won't appear and execute.
        props.setActivateModal(false);

    };

    return (
        <BackgroundModal className="fadeIn" onClick={handleClick}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton src="./src/assets/close.svg" title="Fechar" onClick={handleClick}></CloseButton>
                {props.children}
            </ModalContainer>
        </BackgroundModal>
    );

};

export default Modal;