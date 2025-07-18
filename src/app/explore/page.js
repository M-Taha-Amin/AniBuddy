'use client';
import {
  TextField,
  Container,
  Box,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import React, { useState, useMemo, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { AnimeApiService } from '../services/AnimeAPIService';
import AnimeCard from '../components/AnimeCard';

const page = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const renderedAnime = useMemo(() => {
    return animeList.map((anime, i) => <AnimeCard key={i} anime={anime} />);
  }, [animeList]);

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
      {loading && (
        <Box className="text-center mt-36">
          <CircularProgress color="inherit" />
        </Box>
      )}
      {!loading && (
        <Grid container className="justify-center" spacing={4}>
          {renderedAnime}
        </Grid>
      )}
    </Container>
  );
};

export default page;
