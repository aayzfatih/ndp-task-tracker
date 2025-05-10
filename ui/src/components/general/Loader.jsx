import { Box, LinearProgress } from '@mui/material';
import * as React from 'react';

export const loaderRef = React.createRef();

const Loader = () => {
  const [counter, setCounter] = React.useState(0);
  const incLoader = () => {
    setCounter(x => x + 1);
  };

  const decLoader = () => {
    setCounter(x => x - 1);
  };

  React.useImperativeHandle(loaderRef, () => ({
    incLoader,
    decLoader,
  }), []);
  return (
    counter > 0 && (
      <Box sx={{ width: '100%', flexDirection: 'column', flex: 1, position: 'fixed', zIndex: 9999, height: '100%', background: 'rgba(0,0,0,0.5)' }}>
        <LinearProgress />
      </Box>
    )

  );
};

export default Loader;
