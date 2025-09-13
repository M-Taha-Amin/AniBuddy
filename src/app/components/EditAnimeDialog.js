'use client';

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AnimeCrudService } from '../services/AnimeCrudService';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase/config';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditAnimeDialog = ({ anime }) => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:648px)');
  const [status, setStatus] = useState(anime?.status);
  const [statusError, setStatusError] = useState(false);
  const [statusErrorMessage, setStatusErrorMessage] = useState('');
  const [rating, setRating] = useState(anime?.rating);
  const [ratingError, setRatingError] = useState(false);
  const [ratingErrorMessage, setRatingErrorMessage] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const validStatus = ['Watching', 'On-Hold', 'Finished'];

    if (!validStatus.includes(status)) {
      setStatusError(true);
      setStatusErrorMessage('Please select a valid status');
    } else {
      setStatusError(false);
      setStatusErrorMessage('');
    }
  }, [status]);

  useEffect(() => {
    let ratingNum = Number(rating);
    if (isNaN(rating) || ratingNum < 0 || ratingNum > 10) {
      setRatingError(true);
      setRatingErrorMessage('Invalid rating value');
    } else {
      setRatingError(false);
      setRatingErrorMessage('');
    }
  }, [rating]);

  const editAnime = async anime => {
    await toast.promise(AnimeCrudService.editAnime(user.uid, anime), {
      pending: 'Editing Anime Details',
      success: 'Anime Updated',
      error: 'Failed to update Anime',
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (statusError || ratingError) return;
    anime.rating = parseFloat(rating).toFixed(1);
    anime.status = status;
    await editAnime(anime);
    handleClose();
    router.refresh();
  };

  return (
    <>
      <Button
        variant="outlined"
        size={isSmallScreen ? 'small' : 'medium'}
        color="success"
        sx={{ mt: 2 }}
        onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        fullScreen={isSmallScreen}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>
          Edit <b>{anime?.title}</b> Details
        </DialogTitle>
        <Box className="min-w-[450px]" id="add-anime-form" sx={{ p: '24px' }}>
          <FormControl fullWidth>
            <InputLabel id={`status-label-${anime?.title}`}>Status</InputLabel>
            <Select
              error={statusError}
              labelId={`status-label-${anime?.title}`}
              label="Status"
              value={status}
              onChange={e => {
                setStatus(e.target.value);
              }}>
              <MenuItem value={''} disabled>
                Select Status
              </MenuItem>
              <MenuItem value={'Watching'}>Watching</MenuItem>
              <MenuItem value={'On-Hold'}>On-Hold</MenuItem>
              <MenuItem value={'Finished'}>Finished</MenuItem>
            </Select>
            <FormHelperText error={statusError}>
              {statusErrorMessage}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              sx={{ mt: '16px' }}
              placeholder="Rate this anime..."
              value={rating}
              error={ratingError}
              autoComplete="off"
              type="text"
              helperText={ratingErrorMessage}
              onChange={e => setRating(e.target.value)}
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: 10,
                  step: '0.1',
                  pattern: '[0-9]*',
                },
              }}
            />
          </FormControl>
        </Box>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button form="add-anime-form" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditAnimeDialog;
