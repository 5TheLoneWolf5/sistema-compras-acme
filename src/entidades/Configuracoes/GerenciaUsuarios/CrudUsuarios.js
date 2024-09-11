import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../../../credentials/auth";

export async function insertUsuario(requisicao) {
    
    const docRef = await addDoc(collection(db, "roles"), requisicao);
    return docRef.id;

};

export async function listUsuarios() {

    let result;

    await getDocs(collection(db, "roles"))
        .then((querySnapshot) => {
            result = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        });

    return result;

};

export async function obtainUsuario(id) {

    const docRef = doc(db, "roles", id);
    const docSnap = await getDoc(docRef);

    return { ...docSnap.data(), id: id, };

};

export async function removeUsuario(id) {

    await deleteDoc(doc(db, "roles", id));

};

export async function updateUsuario(usuario, id) {

    await setDoc(doc(db, "roles", id), usuario);

};