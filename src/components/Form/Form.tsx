import { makeStyles } from '@material-ui/core';
import React, { FC, useState } from 'react';

const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

export const useForm = (initialValue: any) => {
  const [values, setValues] = useState(initialValue);

  const handleInputChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const { name, value } = event.target;
    console.log('React.FormEvent' + value);
    setValues({
      ...values,
      [name]: value,
    });
  };
  const resetForm = () => {
    setValues(initialValue);
  };

  return {
    values,
    setValues,
    handleInputChange,
    resetForm,
  };
};

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const Form: FC<Props> = ({ children, onSubmit = () => undefined }) => {
  const classes = useStyle();
  return (
    <form className={classes.root} autoComplete="off" onSubmit={onSubmit}>
      {children}
    </form>
  );
};
