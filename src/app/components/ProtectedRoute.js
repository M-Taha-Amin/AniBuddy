'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase/config';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return children;
};

export default ProtectedRoute;
