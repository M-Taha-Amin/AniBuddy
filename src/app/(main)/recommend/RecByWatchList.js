import ExploreAnimeCard from '@/app/components/AnimeCards/ExploreAnimeCard';
import AnimeCardSkeleton from '@/app/components/AnimeCardSkeleton';
import { AnimeRecService } from '@/app/services/AnimeRecService';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { cryingFaces } from '../dashboard/cryingFaces';

const RecByWatchList = ({ watchList }) => {
  const sortedList = useMemo(
    () =>
      [...watchList].sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      ),
    [watchList]
  );

  const [recs, setRecs] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  useEffect(() => {
    const recommend = async () => {
      setLoadingRecs(true);
      const result = await AnimeRecService.recByWatchlist(sortedList);
      setRecs(result);
      setLoadingRecs(false);
    };
    recommend();
  }, []);

  const skeletonAnime = new Array(6).fill(0).map((_val, i) => {
    return <AnimeCardSkeleton key={i} />;
  });

  const recommendedAnime = recs?.map((anime, i) => (
    <ExploreAnimeCard key={i} anime={anime} />
  ));

  if (watchList.length === 0) {
    return (
      <ShowEmpty
        message="Your anime library is empty, add some favorites to get Personalized
        Recommendations!"
      />
    );
  }

  return (
    <div>
      {!loadingRecs && recs.length === 0 && (
        <ShowEmpty message="No recommendations found for your watchlist, try adding more animes!" />
      )}
      <Grid container className="my-12 justify-center px-16" spacing={4}>
        {loadingRecs ? skeletonAnime : recommendedAnime}
      </Grid>
    </div>
  );
};

const ShowEmpty = ({ message }) => {
  const cryingFace =
    cryingFaces[Math.floor(Math.random() * cryingFaces.length)];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '15px',
        mt: '7rem',
      }}>
      <Typography variant="h5" component="p">
        {cryingFace}
      </Typography>
      <Typography variant="h6" component="p">
        {message}
      </Typography>
    </Box>
  );
};

export default RecByWatchList;
