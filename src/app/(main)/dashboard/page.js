'use client';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { AnimeCrudService } from '@/app/services/AnimeCrudService';
import { cryingFaces } from './cryingFaces';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import useSaveUser from '@/app/hooks/useSaveUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/config';
import DashboardAnimeCard from '@/app/components/AnimeCards/DashboardAnimeCard';

const Page = () => {
  const [animeList, setAnimeList] = useState(null);
  const [user] = useAuthState(auth);
  const savedUser = useSaveUser(user);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAnimeList = async () => {
      setFetching(true);
      const list = await AnimeCrudService.getAllAnime(user?.uid);
      setAnimeList(list);
      setFetching(false);
    };
    fetchAnimeList();
  }, [user]);

  const cryingFace =
    cryingFaces[Math.floor(Math.random() * cryingFaces.length)];

  return (
    <ProtectedRoute>
      {(animeList === null || !savedUser || fetching) && (
        <Box
          sx={{
            minHeight: 'calc(100vh - 75px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CircularProgress color="inherit" />
        </Box>
      )}

      {animeList?.length === 0 && (
        <Box
          sx={{
            minHeight: 'calc(100vh - 75px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '-50px',
            gap: '15px',
          }}>
          <Typography variant="h5">{cryingFace}</Typography>
          <Typography variant="h6">
            Your anime library is empty, add some favorites!
          </Typography>
        </Box>
      )}

      {animeList?.length > 0 && (
        <div>
          <Grid container className="mt-12 justify-center" spacing={6}>
            {animeList.map((anime, i) => (
              <DashboardAnimeCard
                key={i}
                anime={anime}
                onRemove={() => {
                  const filteredList = animeList.filter(
                    listAnime => listAnime.mal_id != anime.mal_id
                  );
                  setAnimeList(filteredList);
                }}
              />
            ))}
          </Grid>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default Page;
