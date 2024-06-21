import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../utils/auth";

export async function insertProduto(produto) {

    const docRef = await addDoc(collection(db, "produtos"), produto);
    return docRef.id;

};

export async function listProdutos() {
    let result;

    await getDocs(collection(db, "produtos"))
        .then((querySnapshot) => {
            result = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // ID coming together with document.
        });

        // console.log(Object.keys(result).map((item, idx) => result[item]["nome"]));
        // console.log(result[0]["nome"]);

    return result;

};

export async function obtainProduto(id) {

    const docRef = doc(db, "produtos", id);
    const docSnap = await getDoc(docRef);

    return docSnap.data();

};

export async function removeProduto(id) {

    await deleteDoc(doc(db, "produtos", id));

};

export async function updateProduto(produto) {

    await setDoc(doc(db, "produtos", contato.id), produto);

};