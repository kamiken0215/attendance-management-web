import { Input } from '@material-ui/core';
import React, { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';

const FormInputText: FC = () => {
  return (
    <div>
      {/* <Input
                  type="text"
                  style={{
                    marginBottom: '1rem',
                    width: '70%',
                  }}
                  {...register('userName', {
                    required: '⚠ 必須項目です',

                    maxLength: {
                      value: 20,
                      message: '⚠ 文字数オーバー',
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="userName"
                  render={({ message }) => (
                    <p className={classes.input}>{message}</p>
                  )}
                /> */}
    </div>
  );
};

export default FormInputText;
