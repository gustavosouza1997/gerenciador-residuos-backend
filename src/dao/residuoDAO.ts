import { db } from "../config/firebaseConfig";
import { Residuo } from "../models/Residuo";
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

  const collectionResiduo = collection(db, "residuo");

export class ResiduoDAO {
  async createResiduo(residuo: Residuo): Promise<void> {
    const residuoData = residuo.toPlainObject();
    await addDoc(collectionResiduo, residuoData);
  }

  private async findDocumentByField(fieldName: string, value: string) {
    const q = query(collectionResiduo, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]?.ref;
      return doc ? doc.id : undefined;
    } else {
      console.log("Nenhum documento encontrado.");
      return null;
    }
  }
  
  async findResiduoByField(fieldName: string, value: string): Promise<Residuo | null> {
    const docRef = await this.findDocumentByField(fieldName, value);

    if (docRef) {
      const docSnapshot = await getDoc(doc(collectionResiduo, docRef));
      
      const residuoData = docSnapshot.data();
      if (residuoData) {
        return {id: docSnapshot.id, ...residuoData} as unknown as Residuo;
      }
    }
    return null;
  }

  async updateResiduo(fieldName: string, value: string, Residuo: Partial<Residuo>): Promise<void> {
    const q = query(collectionResiduo, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const documentRef = querySnapshot.docs[0]?.ref;
      if (documentRef) {
        await updateDoc(documentRef, Residuo);
        console.log("Residuo atualizado com sucesso.");
      } else {
        console.log("Residuo não encontrado para atualização.");
      }
    }
  }

  async deleteResiduo(id: string): Promise<void> {
    const documentRef = doc(collectionResiduo, id);

    try {
      await deleteDoc(documentRef);
      console.log("Resíduo excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir residuo:", error);
    }
  }

  async getAllResiduos(): Promise<Residuo[]> {
    const snapshot = await getDocs(collectionResiduo);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Residuo));
  }
}
