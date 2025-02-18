import {FC} from 'react';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import {Fab} from '@mui/material';

import {COLOR__SECONDARY, COLOR__WHITE} from '@/theme/colors';

export const HelpButton: FC = () => {
  return (
    <>
      <div>here will be the popover</div>
      <Fab
        size="small"
        aria-label="help"
        sx={{
          backgroundColor: COLOR__WHITE,
          color: COLOR__SECONDARY,
        }}
      >
        <QuestionMarkOutlinedIcon />
      </Fab>
    </>
  );
};
