import { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import Modal from "../Modal";

const ForgotPasswordModal = (props) => {

    const [emailReset, setEmailReset] = useState("");
    const [resetMessage, setResetMessage] = useState("");

    // useEffect(() => { console.log(emailReset); });

    useEffect(() => { 
        
        if (props.activateModal) {
            setEmailReset("");
            setResetMessage("");
        }
    
    }, [props.activateModal]);

    const handleResetPassword = () => {

        sendPasswordResetEmail(props.auth, emailReset)
            .then(() => {

                setResetMessage(<p style={{ color: "#12b000" }}>Um email com as instruções para resetar a senha foi enviado para: <strong>{emailReset}</strong></p>);

            })
            .catch((error) => {
                
                // console.log(emailReset)
                setResetMessage(<p style={{ color: "#c70000" }}>Erro {error.code}:<br /><strong>{error.message}</strong></p>);

            });

    };

    return (
        <Modal activateModal={props.activateModal} setActivateModal={props.setActivateModal}>
            <p>Digite o seu email:</p>
            <input type="email" placeholder="exemplo@empresa.com" value={emailReset} onChange={(e) => setEmailReset(e.target.value)} style={{ width: "300px", padding: "5px", border: "1px solid" }} />
            <button type="button" onClick={handleResetPassword} style={{ width: "300px", padding: "5px" }}>Enviar email de redefinição</button>
            {resetMessage}
        </Modal>
    );

};

export default ForgotPasswordModal;