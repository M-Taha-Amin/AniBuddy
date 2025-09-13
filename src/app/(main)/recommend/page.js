'use client';

import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { AnimeCrudService } from '@/app/services/AnimeCrudService';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/config';
import RecByTitle from './RecByTitle';
import RecByWatchList from './RecByWatchList';

const Page = () => {
  const [user, checkingUser] = useAuthState(auth);
  const [recBy, setRecBy] = useState('watchList');
  const [watchList, setWatchList] = useState(null);

  useEffect(() => {
    const fetchWatchList = async () => {
      const list = await AnimeCrudService.getAllAnime(user?.uid);
      setWatchList(list);
    };

    if (user && watchList === null) fetchWatchList();
  }, [user]);

  if ((!user && checkingUser) || (user && watchList === null)) {
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

  if (user) {
    return (
      <>
        {/* Get user's choice on how he wants recs */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: '2rem',
            mt: '2rem',
          }}
          className="px-4 sm:px-0">
          <Typography
            id="rec-by-label"
            sx={{ fontSize: '18px', color: 'gray' }}>
            Recommend based on:
          </Typography>
          <RadioGroup
            value={recBy}
            onChange={e => setRecBy(e.target.value)}
            row
            sx={{
              justifyContent: 'center',
            }}
            name="recBy">
            <FormControlLabel
              value="watchList"
              control={<Radio size="small" />}
              label="Watch List"
            />
            <FormControlLabel
              value="title"
              control={<Radio size="small" />}
              label="Anime Title"
            />
          </RadioGroup>
        </Box>
        {recBy === 'title' && <RecByTitle />}
        {recBy === 'watchList' && <RecByWatchList watchList={watchList} />}
      </>
    );
  }

  if (!user) {
    return <RecByTitle />;
  }
};

export default Page;
