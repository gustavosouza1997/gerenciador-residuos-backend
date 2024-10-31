import { db } from "../config/firebaseConfig";
import { Motorista } from "../models/Motorista";
import {
    collection,
    doc,
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
  } from "firebase/firestore";

  const collectionMotorista = collection(db, "motorista");

export class MotoristaDAO {
  async createMotorista(motorista: Motorista): Promise<void> {
    await addDoc(collectionMotorista, motorista);
  }
  
  async findMotoristaById(id: string): Promise<Motorista | null> {
    const motoristaDoc = await getDoc(doc(collectionMotorista, id));
    return motoristaDoc.exists() ? ({ id: motoristaDoc.id, ...motoristaDoc.data() } as Motorista) : null;
  }

  async updateMotorista(id: string, motorista: Partial<Motorista>): Promise<void> {
    const motoristaRef = doc(collectionMotorista, id);
    await updateDoc(motoristaRef, motorista);
  }

  async deleteMotorista(id: string): Promise<void> {
    await deleteDoc(doc(collectionMotorista, id));
  }

  async getAllMotoristas(): Promise<Motorista[]> {
    const snapshot = await getDocs(collectionMotorista);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Motorista));
  }
}
