import { addDoc, collection, deleteDoc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../utils/auth";

export async function insertContato(contato) {

    console.log(contato)
    console.log(contato.id, contato.nome)
    contato.idFornecedor = JSON.parse(contato.nome)["0"];
    contato.nome = JSON.parse(contato.nome)["1"];
    
    const docRef = await addDoc(collection(db, "contatos"), contato);
    return docRef.id;

};

export async function listContatos() {
    let result;

    await getDocs(collection(db, "contatos"))
        .then((querySnapshot) => {
            result = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // ID coming together with document.
        });

    return result;

};

export async function obtainContato(id) {

    const docRef = doc(db, "contatos", id);
    const docSnap = await getDoc(docRef);

    return docSnap.data();

};

export async function removeContato(id) {

    await deleteDoc(doc(db, "contatos"), id);

};

export async function updateContato(contato) {

    await setDoc(doc(db, "contatos", contato.id), contato);

};