// dao/PessoaDAO.ts
import { db } from "../config/firebaseConfig";
import { Pessoa } from "../models/Pessoa";
import {
    collection,
    doc,
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    query,
    where
  } from "firebase/firestore";

  const collectionPessoa = collection(db, "pessoas");

export class PessoaDAO {
  async createPessoa(pessoa: Pessoa): Promise<void> {
    await addDoc(collectionPessoa, pessoa);
  }

  private async findDocumentByField(fieldName: string, value: string) {
    const q = query(collectionPessoa, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]?.ref;
      return doc ? doc.id : undefined;
    } else {
      console.log("Nenhum documento encontrado.");
      return null;
    }
  }
  
  async findPessoaByField(fieldName: string, value: string): Promise<Pessoa | null> {
    const docRef = await this.findDocumentByField(fieldName, value);
    if (docRef) {
      const docSnapshot = await getDoc(doc(collectionPessoa, docRef));
      return { id: docSnapshot.id, ...docSnapshot.data() } as Pessoa;
    }
    return null;
  }

  async updatePessoa(fieldName: string, value: string, pessoa: Partial<Pessoa>): Promise<void> {
    const q = query(collectionPessoa, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const documentRef = querySnapshot.docs[0]?.ref;
      if (documentRef) {
        await updateDoc(documentRef, pessoa);
        console.log("Pessoa atualizada com sucesso.");
      } else {
        console.log("Pessoa não encontrada para atualização.");
      }
    }
  }

  async deletePessoa(fieldName: string, value: string): Promise<void> {
    /*const docRef = await this.findDocumentByField(fieldName, value);
    if (docRef) {
      await deleteDoc(doc(collectionPessoa, docRef));
    } else {
      throw new Error("Pessoa não encontrada para exclusão.");
    }*/

      const q = query(collectionPessoa, where(fieldName, "==", value));
  }

  async getAllPessoas(): Promise<Pessoa[]> {
    const snapshot = await getDocs(collectionPessoa);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Pessoa));
  }
}
