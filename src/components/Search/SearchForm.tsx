import {
  Button,
  Input,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React, { FC, FormEvent, useRef } from 'react';
import SearchIcon from '@material-ui/icons/Search';

const useStyle = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

type SearchFormProps = {
  handleChange?: (targetName: string, newValue: string) => void;
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  values?: { q: string };
  loading?: boolean;
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const SearchForm: FC<SearchFormProps> = ({
  handleChange = () => undefined,
  values = { q: '' },
}) => {
  const classes = useStyle();
  const value = useRef(null);
  console.log('value is' + String(value));
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className={classes.margin}
        label="YYYYMMDD"
        onChange={(data) => handleChange('q', String(data.currentTarget.value))}
        value={values.q}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchForm;
