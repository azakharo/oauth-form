import {FC, MouseEvent, useState} from 'react';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import {Fab, Link, Popover, Stack, Typography} from '@mui/material';

import {
  COLOR__MAIN_BLACK,
  COLOR__SECONDARY,
  COLOR__WHITE,
} from '@/theme/colors';

const textStyles = {
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '20px',
  color: COLOR__MAIN_BLACK,
};

export const HelpButton: FC = () => {
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setButtonElement(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setButtonElement(null);
  };

  const isOpen = Boolean(buttonElement);
  const popoverId = isOpen ? 'help-popover' : undefined;

  return (
    <>
      <Fab
        size="small"
        aria-label="help"
        sx={{
          backgroundColor: COLOR__WHITE,
          color: '#2D2926',
          '&:hover': {
            color: COLOR__SECONDARY,
          },
        }}
        onClick={handleClick}
        aria-describedby={popoverId}
      >
        <QuestionMarkOutlinedIcon />
      </Fab>

      <Popover
        id={popoverId}
        open={isOpen}
        anchorEl={buttonElement}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: -10,
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '10px',
            },
          },
        }}
      >
        <Stack p={2}>
          <Typography sx={textStyles}>Не получается войти?</Typography>

          <Stack direction="row" spacing={1} alignItems="baseline">
            <Typography noWrap sx={textStyles}>
              Больше информации на
            </Typography>

            <Link href="https://sputnik.lenta.com/" color={COLOR__SECONDARY}>
              <Typography sx={{...textStyles, color: COLOR__SECONDARY}}>
                sputnik.lenta.com
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};
