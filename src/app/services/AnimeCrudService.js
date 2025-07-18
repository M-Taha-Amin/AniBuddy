import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { db } from './DBService';

export class AnimeCrudService {
  static animeCollectionRef = collection(db, 'animes');

  static async getAllAnime() {
    try {
      const docsSnap = await getDocs(this.animeCollectionRef);
      return docsSnap.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async addAnime(animeObject) {
    try {
      await addDoc(this.animeCollectionRef, animeObject);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteAnime(animeId) {
    try {
      const docToDelRef = doc(db, 'animes', animeId);
      await deleteDoc(docToDelRef);
    } catch (error) {
      console.log(error);
    }
  }
}
