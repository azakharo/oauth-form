import {FC, PropsWithChildren} from 'react';
import {Container} from '@mui/material';

export const StepPageLayout: FC<PropsWithChildren> = ({children}) => (
  <Container maxWidth="sm">
    {children}
  </Container>
);
