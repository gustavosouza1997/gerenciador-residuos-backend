// dao/PessoaDAO.ts
import { db } from "../config/firebaseConfig";
import { Pessoa } from "../models/Pessoa";
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs
  } from "firebase/firestore";

  const collectionPessoa = collection(db, "pessoas");

export class PessoaDAO {
  async createPessoa(pessoa: Pessoa): Promise<void> {
    const pessoaData = pessoa.toPlainObject();
    await addDoc(collectionPessoa, pessoaData);
  }

  async updatePessoa(id: string, pessoa: Partial<Pessoa>): Promise<void> {
    const documentRef = doc(collectionPessoa, id);

    try {
      await updateDoc(documentRef, pessoa);
      console.log("Pessoa atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar pessoa:", error);
    }
  }

  async deletePessoa(id: string,): Promise<void> {
    const documentRef = doc(collectionPessoa, id);

    try {
      await deleteDoc(documentRef);
      console.log("Pessoa excluída com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
    }
  }  

  async getAllPessoas(): Promise<Pessoa[]> {
    const snapshot = await getDocs(collectionPessoa);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Pessoa));
  }
}
