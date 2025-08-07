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
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/config';
import AddAnimeDialog from '../AddAnimeDialog';

const ExploreAnimeCard = ({ anime }) => {
  const [user] = useAuthState(auth);
  const isSmallScreen = useMediaQuery('(max-width:480px)');

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
          {user && <AddAnimeDialog anime={anime} />}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExploreAnimeCard;
