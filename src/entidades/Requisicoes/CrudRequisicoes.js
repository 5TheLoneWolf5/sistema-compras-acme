import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../../credentials/auth";
import { convertToUnix } from "../../utils/functions";

const sanitizeRequisicao = (requisicao, initialFieldsSanitized) => {

    requisicao.quantidade = Number(requisicao.quantidade);

    if (!initialFieldsSanitized) {
        requisicao.dataAbertura = convertToUnix(requisicao.dataAbertura);
    }

    return requisicao;

};

export async function insertRequisicao(requisicao) {

    requisicao = sanitizeRequisicao(requisicao, false);
    
    const docRef = await addDoc(collection(db, "requisicoes"), requisicao);
    return docRef.id;

};

export async function listRequisicoes() {

    let result;

    await getDocs(collection(db, "requisicoes"))
        .then((querySnapshot) => {
            // console.log(querySnapshot.docs.map(doc => doc.data()));
            result = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // ID coming together with document, since it is an automatic field created by FB (not by me).
        });

    return result;

};

export async function obtainRequisicao(id) {

    const docRef = doc(db, "requisicoes", id); // Obtaining doc reference and then its snap. Returning the data itself.
    // console.log(docRef);
    const docSnap = await getDoc(docRef); // Only its reference.
    // console.log(docSnap);

    return { ...docSnap.data(), id: id, };

};

export async function removeRequisicao(id) {

    await deleteDoc(doc(db, "requisicoes", id));

};

export async function updateRequisicao(requisicao, id) {

    const oldData = await obtainRequisicao(id);
    // console.log(requisicao);
    // console.log(oldData);
    // console.log({ ...oldData, ...requisicao });

    await setDoc(doc(db, "requisicoes", id), sanitizeRequisicao({ ...oldData, ...requisicao }, true)); // In order for it to have all fields sanitized, object needs to be complete with all fields.

};