import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/config';
import { useRef } from 'react';

function ForgotPassword({ open, handleClose }) {
  const [sendPwdResetEmail, loading, error] = useSendPasswordResetEmail(auth);
  const emailRef = useRef();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: async event => {
            event.preventDefault();
            handleClose();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex.test(emailRef.current.value)) {
              console.log(emailRef.current.value);
              await sendPwdResetEmail(emailRef.current.value);
              alert('Password reset email sent, check your inbox spam folder!');
            } else {
              alert('Invalid Email address, please provide a valid email');
            }
          },
          sx: { backgroundImage: 'none' },
        },
      }}>
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
        }}>
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="your@email.com"
          type="email"
          fullWidth
          inputRef={emailRef}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ForgotPassword;
