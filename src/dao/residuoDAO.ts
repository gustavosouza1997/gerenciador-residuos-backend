import { db } from "../config/firebaseConfig";
import { Residuo } from "../models/Residuo";
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs
  } from "firebase/firestore";

  const collectionResiduo = collection(db, "residuo");

export class ResiduoDAO {
  async createResiduo(residuo: Residuo): Promise<void> {
    const residuoData = residuo.toPlainObject();
    await addDoc(collectionResiduo, residuoData);
  }

  async updateResiduo(id: string, Residuo: Partial<Residuo>): Promise<void> {
    const documentRef = doc(collectionResiduo, id);

    try {
      await updateDoc(documentRef, Residuo);
      console.log("Resíduo atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar residuo:", error);
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
