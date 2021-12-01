import {
  Button,
  CardContent,
  Grid,
  Input,
  makeStyles,
} from '@material-ui/core';
import { Send, AccountCircle } from '@material-ui/icons';
import React, { FC } from 'react';
import { Companies } from '../../../../entities/Companies';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#bf1650',
    fontSize: '1rem',
    fontWeight: 600,
  },
}));

type props = {
  company: Companies;
  editComapny?: (data: FormInputs) => void;
};

type FormInputs = {
  companyName: string;
};

const CompanySettingComponent: FC<props> = ({ company, editComapny }) => {
  const classes = useStyles();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      companyName: company.companyName,
    },
  });
  const onSubmit = (data: FormInputs) => {
    editComapny(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <CardContent>
            <Grid
              container
              spacing={2}
              justifyContent={'center'}
              style={{
                verticalAlign: 'center',
              }}
            >
              <Grid item xs={4}>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    alignItems: 'left',
                    justifyContent: 'left',
                  }}
                >
                  <AccountCircle
                    style={{
                      marginRight: '6px',
                    }}
                  />
                  会社名
                </div>
              </Grid>
              <Grid item xs={6}>
                <Input
                  type="text"
                  {...register('companyName', {
                    required: '⚠ 必須項目です',

                    maxLength: {
                      value: 20,
                      message: '⚠ 文字数オーバー',
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="companyName"
                  render={({ message }) => (
                    <p className={classes.input}>{message}</p>
                  )}
                />
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </CardContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button type="submit" variant="outlined" endIcon={<Send />}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanySettingComponent;
