import { db } from "../config/firebaseConfig";
import { Transportador } from "../models/Transportador";
import {
    collection,
    doc,
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
  } from "firebase/firestore";

  const collectionTransportador = collection(db, "transportador");

export class TransportadorDAO {
  async createTransportador(transportador: Transportador): Promise<void> {
    await addDoc(collectionTransportador, transportador);
  }
  
  async findTransportadorById(id: string): Promise<Transportador | null> {
    const transportadorDoc = await getDoc(doc(collectionTransportador, id));
    return transportadorDoc.exists() ? ({ id: transportadorDoc.id, ...transportadorDoc.data() } as Transportador) : null;
  }

  async updateTransportador(id: string, transportador: Partial<Transportador>): Promise<void> {
    const TransportadorRef = doc(collectionTransportador, id);
    await updateDoc(TransportadorRef, transportador);
  }

  async deleteTransportador(id: string): Promise<void> {
    await deleteDoc(doc(collectionTransportador, id));
  }

  async getAllTransportadores(): Promise<Transportador[]> {
    const snapshot = await getDocs(collectionTransportador);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transportador));
  }
}
