import { db } from "../config/firebaseConfig";
import { Veiculo } from "../models/Veiculo";
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

  const collectionVeiculo = collection(db, "veiculo");

export class VeiculoDAO {
  async createVeiculo(Veiculo: Veiculo): Promise<void> {
    const VeiculoData = Veiculo.toPlainObject();
    await addDoc(collectionVeiculo, VeiculoData);
  }

  private async findDocumentByField(fieldName: string, value: string) {
    const q = query(collectionVeiculo, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]?.ref;
      return doc ? doc.id : undefined;
    } else {
      console.log("Nenhum documento encontrado.");
      return null;
    }
  }
  
  async findVeiculoByField(fieldName: string, value: string): Promise<Veiculo | null> {
    const docRef = await this.findDocumentByField(fieldName, value);

    if (docRef) {
      const docSnapshot = await getDoc(doc(collectionVeiculo, docRef));
      
      const pessoaData = docSnapshot.data();
      if (pessoaData) {
        return {id: docSnapshot.id, ...pessoaData} as unknown as Veiculo;
      }
    }
    return null;
  }

  async updateVeiculo(fieldName: string, value: string, veiculo: Partial<Veiculo>): Promise<void> {
    const q = query(collectionVeiculo, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const documentRef = querySnapshot.docs[0]?.ref;
      if (documentRef) {
        await updateDoc(documentRef, veiculo);
        console.log("Veiculo atualizada com sucesso.");
      } else {
        console.log("Veiculo não encontrada para atualização.");
      }
    }
  }

  async deleteVeiculo(fieldName: string, value: string): Promise<void> {
    const q = query(collectionVeiculo, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const documentRef = querySnapshot.docs[0]?.ref;
      if (documentRef) {
        await deleteDoc(documentRef);
        console.log("Veiculo excluída com sucesso.");
      } else {
        console.log("Veiculo não encontrada para exclusão.");
      }
    } else {
      console.log("Nenhum documento encontrado para exclusão.");
    }
  }

  async getAllVeiculos(): Promise<Veiculo[]> {
    const snapshot = await getDocs(collectionVeiculo);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Veiculo));
  }
}
