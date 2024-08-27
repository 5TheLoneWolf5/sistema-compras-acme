import { useContext, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import Modal from "../Modal";
import AuthContext from "../../contexts/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AddAdminModal = (props) => {

    const [idInput, setIdInput] = useState("");
    const [resetMessage, setResetMessage] = useState("");

    const auth = useContext(AuthContext);

    const handleAddAdmin = async () => {

        const docRef = doc(props.db, "roles", idInput); 
        const docSnap = await getDoc(docRef);

        await setDoc(doc(props.db, "roles", idInput), {
            ...docSnap.data(),
            role: "admin",
        }).then(() => setResetMessage(<p style={{ color: "#12b000" }}>Papel de administrador concedido para <strong>{docSnap.data().email}</strong>.</p>))
        .catch((e) => {
            setResetMessage(<p style={{ color: "#c70000" }}>Erro ao conceder papel de administrador: {e.message}.</p>);
        });

    };

    return (
        <Modal activateModal={props.activateModal} setActivateModal={props.setActivateModal}>
            <p>Digite o email:</p>
            <input type="email" placeholder="Digite o UID do usuário." value={idInput} onChange={(e) => setIdInput(e.target.value)} style={{ width: "300px", padding: "5px", border: "1px solid" }} />
            <button type="button" onClick={handleAddAdmin} style={{ width: "300px", padding: "5px" }}>Conceder Papel de Administrador</button>
            {resetMessage}
        </Modal>
    );

};

export default AddAdminModal;