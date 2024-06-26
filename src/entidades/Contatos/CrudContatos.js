import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../../credentials/auth";

const sanitizeContato = (contato) => {
    
    // console.log(contato);
    // console.log(contato.id, contato.nome);
    contato.idFornecedor = JSON.parse(contato.nome)["0"];
    contato.nome = JSON.parse(contato.nome)["1"];
    
    if (contato.numero) {
        contato.numero = Number(contato.numero); // If it is empty, it goes as empty to the DB, instead of a zero.
    }

    return contato;

};

export async function insertContato(contato) {

    contato = sanitizeContato(contato);
    
    // console.log(contato);
    
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

    const docRef = doc(db, "contatos", id); // Only its reference, but not the snap, data itself.
    // console.log(docRef);
    const docSnap = await getDoc(docRef); // Only its reference.
    // console.log(docSnap);

    return docSnap.data();

};

export async function removeContato(id) {

    await deleteDoc(doc(db, "contatos", id));

};

export async function updateContato(contato) {

    // console.log(contato);

    contato = sanitizeContato(contato);

    // console.log(contato);

    await setDoc(doc(db, "contatos", contato.id), contato);

};