import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

const useSaveUser = () => {
  const [saved, setSaved] = useState(false);
  const [user] = useAuthState(auth);

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
