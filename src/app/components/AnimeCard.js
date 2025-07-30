'use client';

import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Chip,
  Typography,
  Button,
  useMediaQuery,
} from '@mui/material';
import { AnimeCrudService } from '@/app/services/AnimeCrudService';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/config';
import { toast } from 'react-toastify';

const AnimeCard = ({ anime, page = 'explore', onRemove }) => {
  const [user] = useAuthState(auth);
  const isSmallScreen = useMediaQuery('(max-width:480px)');

  const addAnime = async () => {
    await toast.promise(AnimeCrudService.addAnime(user.uid, anime), {
      pending: 'Adding Anime to List',
      success: 'Anime Added',
      error: 'Failed to Add Anime to List',
    });
  };

  const deleteAnime = async () => {
    await toast.promise(AnimeCrudService.deleteAnime(user?.uid, anime.id), {
      pending: 'Removing Anime',
      success: 'Anime Removed',
      error: 'Failed to Remove Anime',
    });
    onRemove();
  };

  const onClick = page == 'explore' ? addAnime : deleteAnime;

  return (
    <Card
      className="w-fit h-fit"
      sx={{
        maxWidth: '350px',
        minWidth: isSmallScreen ? '250px' : '300px',
      }}
      elevation={2}>
      <CardMedia className="object-contain w-full h-56" image={anime.poster} />
      <CardContent>
        {/* Title and status container */}
        <Box className="flex justify-between items-center">
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              wordBreak: 'break-word',
              maxWidth: '60%',
            }}
            component="p">
            {anime.title}
          </Typography>
          <Chip label={anime.status} size="small" color="success" />
        </Box>
        {/* Genre tags under title */}
        <Box className="flex flex-wrap gap-1 mt-2">
          {anime.genres.map((genre, i) => (
            <Chip key={i} label={genre} size="small" />
          ))}
        </Box>
        {/* Details & Add to List Buttons */}
        <Box className="flex gap-2 mt-8">
          <Button
            variant="contained"
            size={isSmallScreen ? 'small' : 'medium'}
            color="primary"
            sx={{ mt: 2 }}>
            Details
          </Button>
          {user && (
            <Button
              variant="outlined"
              color={page == 'explore' ? 'success' : 'error'}
              sx={{ mt: 2 }}
              size={isSmallScreen ? 'small' : 'medium'}
              onClick={onClick}>
              {page == 'explore' ? 'Add to List' : 'Remove'}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
