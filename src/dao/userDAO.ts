import { db } from "../config/firebaseConfig";
import { User } from "../models/User";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

// Referência para a coleção de usuários
const usersCollection = collection(db, "users");

export class UserDAO {
  async createUser(user: User): Promise<User> {
    const userRef = await addDoc(usersCollection, user);
    const { id, ...userWithoutId } = user;
    return { id: userRef.id, ...userWithoutId };
  }

  async findUserById(id: string): Promise<User | null> {
    const userDoc = await getDoc(doc(usersCollection, id));
    return userDoc.exists() ? ({ id: userDoc.id, ...userDoc.data() } as User) : null;
  }

  async updateUser(id: string, user: Partial<User>): Promise<void> {
    const userRef = doc(usersCollection, id);
    await updateDoc(userRef, user);
  }

  async deleteUser(id: string): Promise<void> {
    await deleteDoc(doc(usersCollection, id));
  }

  async getAllUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
  }
}
