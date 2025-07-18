'use client';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { AnimeCrudService } from '../services/AnimeCrudService';
import AnimeCard from '../components/AnimeCard';
import { cryingFaces } from './cryingFaces';
import { useEffect, useState } from 'react';

const Page = () => {
  const [animeList, setAnimeList] = useState(null);

  useEffect(() => {
    const fetchAnimeList = async () => {
      const list = await AnimeCrudService.getAllAnime();
      setAnimeList(list);
    };

    fetchAnimeList();
  }, []);

  const cryingFace =
    cryingFaces[Math.floor(Math.random() * cryingFaces.length)];

  if (animeList === null) {
    return (
      <Box
        sx={{
          minHeight: 'calc(100vh - 75px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (animeList.length === 0) {
    return (
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
    );
  }

  return (
    <div>
      <Grid container className="mt-12 justify-center" spacing={6}>
        {animeList.map((anime, i) => (
          <AnimeCard
            key={i}
            anime={anime}
            page="dashboard"
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
  );
};

export default Page;
