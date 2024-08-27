import { useEffect } from "react";
import TextBlock from "./TextBlock";

const ButtonModal = (props) => {
    
    const handleResetButton = () => props.setActivateModal(!props.activateModal);

    return (
        <TextBlock onClick={handleResetButton} className="modalButton">{props.children}</TextBlock>
    );

};

export default ButtonModal;