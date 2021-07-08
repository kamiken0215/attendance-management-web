import { Button, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    '& .MuiButton-label': {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: theme.palette.secondary.main,
    '& .MuiButton-label': {
      color: theme.palette.primary.main,
    },
  },
}));

type Props = {
  variant?: 'text' | 'outlined' | 'contained';
  type?: 'submit' | 'button' | 'reset';
  color?: 'primary' | 'inherit' | 'secondary' | 'default';
  text?: string;
  startIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
};

const ActionButton: FC<Props> = ({
  variant = 'contained',
  type = 'submit',
  color = 'default',
  text = '',
  startIcon,
  onClick = () => undefined,
}) => {
  const classes = useStyle();
  return (
    <Button
      startIcon={startIcon}
      variant={variant}
      type={type}
      className={`${classes.root} ${classes[color]}`}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
