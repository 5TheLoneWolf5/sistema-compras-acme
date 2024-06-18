import { addDoc, collection, deleteDoc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../utils/auth";

export async function insertFornecedor(fornecedor) {

    const docRef = await addDoc(collection(db, "fornecedores"), fornecedor);
    return docRef.id;

};

export async function listFornecedores() {
    let result;

    await getDocs(collection(db, "fornecedores"))
        .then((querySnapshot) => {
            result = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // ID coming together with document.
        });

        // console.log(Object.keys(result).map((item, idx) => result[item]["nome"]));
        // console.log(result[0]["nome"]);

    return result;

};

export async function obtainFornecedor(id) {

    const docRef = doc(db, "fornecedores", id);
    const docSnap = await getDoc(docRef);

    return docSnap.data();

};

export async function remoteFornecedor(id) {

    await deleteDoc(doc(db, "fornecedores"), id);

};

export async function updateFornecedor(contato) {

    await setDoc(doc(db, "fornecedores", contato.id), contato);

};