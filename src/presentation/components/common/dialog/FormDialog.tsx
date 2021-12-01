import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { DateTimePicker, LocalizationProvider } from '@material-ui/pickers';
import jaLocale from 'date-fns/locale/ja';
import DateFnsUtils from '@date-io/date-fns';

const Times = ['00:30', '01:00', '01:30', '02:00'];

type Props = {
  title: string;
  isOpen: boolean;
  ButtonText: string;
  doClose: () => void;
};

export const FormDialog: React.FC<Props> = ({
  title,
  isOpen,
  ButtonText,
  doClose,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string>('30');

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    doClose();
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <TextField
              id="standard-select-currency"
              select
              label="Select"
              value={time}
              onChange={handleTimeChange}
              helperText="調整取得時間を選択してください"
            >
              {Times.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          {/* TODO:処理を加える関数に変更する */}
          <Button onClick={handleClose} color="primary">
            {ButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
