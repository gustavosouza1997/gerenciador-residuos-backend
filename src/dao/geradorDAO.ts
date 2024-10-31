import { db } from "../config/firebaseConfig";
import { Gerador } from "../models/Gerador";
import {
    collection,
    doc,
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
  } from "firebase/firestore";

  const collectionGerador = collection(db, "gerador");

export class GeradorDAO {
  async createGerador(gerador: Gerador): Promise<void> {
    await addDoc(collectionGerador, gerador);
  }
  
  async findGeradorById(id: string): Promise<Gerador | null> {
    const geradorDoc = await getDoc(doc(collectionGerador, id));
    return geradorDoc.exists() ? ({ id: geradorDoc.id, ...geradorDoc.data() } as Gerador) : null;
  }

  async updateGerador(id: string, gerador: Partial<Gerador>): Promise<void> {
    const geradorRef = doc(collectionGerador, id);
    await updateDoc(geradorRef, gerador);
  }

  async deleteGerador(id: string): Promise<void> {
    await deleteDoc(doc(collectionGerador, id));
  }

  async getAllGeradores(): Promise<Gerador[]> {
    const snapshot = await getDocs(collectionGerador);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gerador));
  }
}
