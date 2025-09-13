import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { cryingFaces } from '../dashboard/cryingFaces';
import { useState } from 'react';
import AnimeCardSkeleton from '@/app/components/AnimeCardSkeleton';
import ExploreAnimeCard from '@/app/components/AnimeCards/ExploreAnimeCard';
import { AnimeRecService } from '@/app/services/AnimeRecService';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const RecByTitle = () => {
  const [title, setTitle] = useState('');
  const [recs, setRecs] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);

  const cryingFace =
    cryingFaces[Math.floor(Math.random() * cryingFaces.length)];

  const skeletonAnime = new Array(6).fill(0).map((_val, i) => {
    return <AnimeCardSkeleton key={i} />;
  });

  const recommendedAnime = recs?.map((anime, i) => (
    <ExploreAnimeCard key={i} anime={anime} />
  ));

  const recommend = async () => {
    setLoadingRecs(true);
    const result = await AnimeRecService.recByTitle(title);
    setRecs(result);
    setLoadingRecs(false);
  };

  return (
    <>
      <Box className="flex justify-center pt-8 gap-2">
        <TextField
          variant="outlined"
          size="small"
          className="w-sm"
          placeholder="One Piece..."
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            setRecs(null);
          }}
          autoComplete="off"
        />
        <Button variant="outlined" onClick={recommend}>
          <AutoAwesomeIcon />
        </Button>
      </Box>
      <div>
        {recs?.length == 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 'calc(100vh - 300px)',
              justifyContent: 'center',
            }}>
            <Typography variant="h5" component="p">
              {cryingFace}
            </Typography>
            <Typography variant="h6" component="p">
              Requested Anime not Found!
            </Typography>
          </Box>
        )}
        <Grid container className="my-12 justify-center px-16" spacing={4}>
          {loadingRecs ? skeletonAnime : recommendedAnime}
        </Grid>
      </div>
    </>
  );
};

export default RecByTitle;
