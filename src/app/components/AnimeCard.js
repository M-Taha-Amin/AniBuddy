'use client';

import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Chip,
  Typography,
  Button,
} from '@mui/material';
import { AnimeCrudService } from '../services/AnimeCrudService';
import { useRouter } from 'next/navigation';

const AnimeCard = ({ anime, page = 'explore' }) => {
  const router = useRouter();

  const addAnime = async () => {
    await AnimeCrudService.addAnime(anime);
    alert('Anime added to DB');
  };

  const deleteAnime = async () => {
    await AnimeCrudService.deleteAnime(anime.id);
    router.refresh();
  };

  const onClick = page == 'explore' ? addAnime : deleteAnime;

  return (
    <Card className="w-fit h-fit max-w-[350px] min-w-[300px]" elevation={2}>
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
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Details
          </Button>
          <Button
            variant="outlined"
            color={page == 'explore' ? 'success' : 'error'}
            sx={{ mt: 2 }}
            onClick={onClick}>
            {page == 'explore' ? 'Add to List' : 'Remove'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
