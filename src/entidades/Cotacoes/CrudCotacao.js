import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../../credentials/auth";
import { convertToUnix } from "../../utils/functions";

const sanitizeCotacao = (cotacao) => {
    
    cotacao.idProduto = JSON.parse(cotacao.produto)["0"];
    cotacao.produto = JSON.parse(cotacao.produto)["1"];

    cotacao.idFornecedor = JSON.parse(cotacao.fornecedor)["0"];
    cotacao.fornecedor = JSON.parse(cotacao.fornecedor)["1"];

    cotacao.preco = Number(cotacao.preco);

    cotacao.dataCompra = convertToUnix(cotacao.dataCompra);

    return cotacao;

};

export async function insertCotacao(cotacao) {

    cotacao = sanitizeCotacao(cotacao);
    
    const docRef = await addDoc(collection(db, "cotacoes"), cotacao);
    return docRef.id;

};

export async function listCotacoes() {

    let result;

    await getDocs(collection(db, "cotacoes"))
        .then((querySnapshot) => {
            result = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // ID coming together with document.
        });

    return result;

};

export async function obtainCotacao(id) {

    const docRef = doc(db, "cotacoes", id); // Only its reference, but not the snap, data itself.
    // console.log(docRef);
    const docSnap = await getDoc(docRef); // Only its reference.
    // console.log(docSnap);

    return docSnap.data();

};

export async function removeCotacao(id) {

    await deleteDoc(doc(db, "cotacoes", id));

};

export async function updateCotacao(cotacao) {

    cotacao = sanitizeCotacao(cotacao);

    await setDoc(doc(db, "cotacoes", cotacao.id), cotacao);

};