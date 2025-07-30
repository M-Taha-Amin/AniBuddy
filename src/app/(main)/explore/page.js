'use client';

import { TextField, Container, Box, Button, Grid } from '@mui/material';
import React, { useState, useMemo, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { AnimeApiService } from '@/app/services/AnimeAPIService';
import AnimeCard from '@/app/components/AnimeCard';
import AnimeCardSkeleton from '@/app/components/AnimeCardSkeleton';
import useSaveUser from '@/app/hooks/useSaveUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/config';

const page = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const savedUser = useSaveUser(user);

  const renderedAnime = useMemo(() => {
    return animeList.map((anime, i) => <AnimeCard key={i} anime={anime} />);
  }, [animeList]);

  const skeletonAnime = new Array(6).fill(0).map((_val, i) => {
    return <AnimeCardSkeleton key={i} />;
  });

  useEffect(() => {
    const fetchAiringAnime = async () => {
      setLoading(true);
      setAnimeList(await AnimeApiService.getTopAiringAnime());
      setLoading(false);
    };
    fetchAiringAnime();
  }, []);

  const searchAnime = async () => {
    setLoading(true);
    const result = await AnimeApiService.getAnimeByName(searchQuery);
    setAnimeList(result);
    setLoading(false);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        paddingBottom: 8,
      }}>
      {/* Input Bar to Search */}
      <Box className="flex justify-center pt-8 gap-2">
        <TextField
          variant="outlined"
          size="small"
          className="w-sm"
          placeholder="Search For Anime..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <Button variant="outlined" onClick={searchAnime}>
          <SearchIcon />
        </Button>
      </Box>
      <Grid container className="justify-center" spacing={4}>
        {loading || (user && !savedUser) ? skeletonAnime : renderedAnime}
      </Grid>
    </Container>
  );
};

export default page;
