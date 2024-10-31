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
  } from "firebase/firestore";

  const collectionVeiculo = collection(db, "veiculo");

export class VeiculoDAO {
  async createVeiculo(Veiculo: Veiculo): Promise<void> {
    await addDoc(collectionVeiculo, Veiculo);
  }
  
  async findVeiculoById(id: string): Promise<Veiculo | null> {
    const VeiculoDoc = await getDoc(doc(collectionVeiculo, id));
    return VeiculoDoc.exists() ? ({ id: VeiculoDoc.id, ...VeiculoDoc.data() } as Veiculo) : null;
  }

  async updateVeiculo(id: string, Veiculo: Partial<Veiculo>): Promise<void> {
    const VeiculoRef = doc(collectionVeiculo, id);
    await updateDoc(VeiculoRef, Veiculo);
  }

  async deleteVeiculo(id: string): Promise<void> {
    await deleteDoc(doc(collectionVeiculo, id));
  }

  async getAllVeiculos(): Promise<Veiculo[]> {
    const snapshot = await getDocs(collectionVeiculo);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Veiculo));
  }
}
