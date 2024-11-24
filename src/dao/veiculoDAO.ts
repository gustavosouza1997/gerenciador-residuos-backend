import { db } from "../config/firebaseConfig";
import { Veiculo } from "../models/Veiculo";
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs
  } from "firebase/firestore";

  const collectionVeiculo = collection(db, "veiculo");

export class VeiculoDAO {
  async createVeiculo(Veiculo: Veiculo): Promise<void> {
    const VeiculoData = Veiculo.toPlainObject();
    await addDoc(collectionVeiculo, VeiculoData);
  }

  async updateVeiculo(id: string, veiculo: Partial<Veiculo>): Promise<void> {
    const documentRef = doc(collectionVeiculo, id);

    try {
      await updateDoc(documentRef, veiculo);
      console.log("Veículo atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
    }
  }

  async deleteVeiculo(id: string): Promise<void> {
    const documentRef = doc(collectionVeiculo, id);

    try {
      await deleteDoc(documentRef);
      console.log("Veículo excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    }
  }

  async getAllVeiculos(): Promise<Veiculo[]> {
    const snapshot = await getDocs(collectionVeiculo);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Veiculo));
  }
}
