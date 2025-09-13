import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

export class AnimeCrudService {
  static async getAllAnime(uid) {
    if (!uid) return [];
    const animeListRef = collection(db, 'users', uid, 'animelist');
    const animeList = await getDocs(animeListRef);
    return animeList.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async addAnime(uid, animeObject) {
    if (!uid) return;
    const AnimeSubCollection = collection(db, 'users', uid, 'animelist');
    await addDoc(AnimeSubCollection, animeObject);
  }

  static async editAnime(uid, animeObject) {
    if (!uid) return;
    const docRef = doc(db, 'users', uid, 'animelist', animeObject.id);
    await updateDoc(docRef, {
      rating: animeObject.rating,
      status: animeObject.status,
    });
  }

  static async deleteAnime(uid, animeId) {
    const docToDelRef = doc(db, 'users', uid, 'animelist', animeId);
    await deleteDoc(docToDelRef);
  }
}
