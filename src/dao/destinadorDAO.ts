import { db } from "../config/firebaseConfig";
import { Destinador } from "../models/Destinador";
import {
    collection,
    doc,
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
  } from "firebase/firestore";

  const collectionDestinador = collection(db, "destinador");

export class DestinadorDAO {
  async createDestinador(destinador: Destinador): Promise<void> {
    await addDoc(collectionDestinador, destinador);
  }
  
  async findDestinadorById(id: string): Promise<Destinador | null> {
    const destinadorDoc = await getDoc(doc(collectionDestinador, id));
    return destinadorDoc.exists() ? ({ id: destinadorDoc.id, ...destinadorDoc.data() } as Destinador) : null;
  }

  async updateDestinador(id: string, destinador: Partial<Destinador>): Promise<void> {
    const destinadorRef = doc(collectionDestinador, id);
    await updateDoc(destinadorRef, destinador);
  }

  async deleteDestinador(id: string): Promise<void> {
    await deleteDoc(doc(collectionDestinador, id));
  }

  async getAllDestinadores(): Promise<Destinador[]> {
    const snapshot = await getDocs(collectionDestinador);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Destinador));
  }
}
