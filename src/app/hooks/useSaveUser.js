import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase/config';

const useSaveUser = user => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    let isMounted = true;

    const saveUser = async () => {
      if (localStorage.getItem('uid') === user.uid) {
        if (isMounted) setSaved(true);
        return;
      }

      const userToSave = {
        id: user.uid,
        email: user.email,
      };

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, userToSave);
      }

      localStorage.setItem('uid', user.uid);
      if (isMounted) setSaved(true);
    };

    saveUser();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return saved;
};

export default useSaveUser;
