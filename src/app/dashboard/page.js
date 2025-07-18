import { Box, Grid, Typography } from '@mui/material';
import { AnimeCrudService } from '../services/AnimeCrudService';
import AnimeCard from '../components/AnimeCard';
import { cryingFaces } from './cryingFaces';

const page = async () => {
  const animeList = await AnimeCrudService.getAllAnime();
  const cryingFace =
    cryingFaces[Math.floor(Math.random() * cryingFaces.length)];


  if (animeList.length == 0) {
    return (
      <Box
        sx={{
          minHeight: 'calc(100vh - 75px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '-50px',
          gap: '15px'
        }}>
        <Typography variant="h5">
          {cryingFace}
        </Typography>
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
          <AnimeCard key={i} anime={anime} page="dashboard" />
        ))}
      </Grid>
    </div>
  );
};

export default page;
