import {
  Box,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Departments } from '../../../../entities/Departments';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#393E46',
  },
  select: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    '&:not(.Mui-disabled):hover::before': {
      borderColor: 'white',
    },
  },
  icon: {
    fill: 'white',
  },
  selectRoot: {
    color: 'white',
  },
  button: {
    margin: theme.spacing(2),
    width: '14rem',
    fontWeight: 600,
    fontSize: '1.2rem',
    borderColor: '#c5c5c5',
    border: 'solid',
    background: '#FD7013',
    color: '#EEEEEE',
    '& :hover': {
      color: '#343951',
    },
  },
}));

type Props = {
  departmentCode: string;
  handleChange: (event: any) => void;
  itemList: Departments[];
  handleOnSearch: (value: any) => void;
};

const UserSearchForm: FC<Props> = ({
  departmentCode,
  handleChange,
  itemList,
  handleOnSearch,
}) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Select
        className={classes.select}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={departmentCode}
        label="Age"
        onChange={handleChange}
        style={{
          width: '10rem',
          marginBottom: '1rem',
          fontWeight: 500,
          color: '#fff',
          outlineColor: '#fff',
          borderColor: '#fff',
        }}
        inputProps={{
          classes: {
            icon: classes.icon,
            root: classes.selectRoot,
          },
        }}
      >
        <MenuItem key={0} value={''}>
          指定なし
        </MenuItem>
        {itemList.map((v) => (
          <MenuItem key={v.departmentCode} value={v.departmentCode}>
            {v.departmentName}
          </MenuItem>
        ))}
      </Select>
      <Button
        className={classes.button}
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={() => handleOnSearch(departmentCode)}
      >
        検索
      </Button>
    </div>
  );
};
export default UserSearchForm;
