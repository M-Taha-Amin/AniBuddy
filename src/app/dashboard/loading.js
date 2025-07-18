import { Box, CircularProgress } from '@mui/material';
const loading = () => {
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
};

export default loading;
