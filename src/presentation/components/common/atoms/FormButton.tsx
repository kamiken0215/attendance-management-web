import { Button as MuiButton, colors, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

const useStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
}));

type Props = {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'inherit' | 'secondary' | 'default';
  variant?: 'text' | 'outlined' | 'contained';
  onClick?;
};

const FormButton: FC<Props> = ({
  type = 'submit',
  text = '',
  size = 'medium',
  color = 'primary',
  variant = 'outlined',
  onClick = () => undefined,
}) => {
  const classes = useStyle();
  return (
    <MuiButton
      classes={{ root: classes.root, label: classes.label }}
      type={type}
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
    >
      {text}
    </MuiButton>
  );
};

export default FormButton;
