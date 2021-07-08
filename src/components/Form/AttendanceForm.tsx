import { Grid } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import {
  Attendance,
  blankAttendance,
} from '../../services/attendance-management/models/Attendance';
import { FormControls } from '../common/atoms/FormControls';
import { Form, useForm } from '../Form/Form';
import { getAttendanceOptions } from '../../services/attendance-management/models/Attendance';
import { formatToDate, formatToTime } from '../../utils/format-tools';

type FormAttendanceProps = {
  attendance: Attendance;
  recordForEdit?: Attendance;
  addOrEdit: (attendance: Attendance, resetForm: () => void) => void;
};
const AttendanceForm: FC<FormAttendanceProps> = ({
  attendance = blankAttendance,
  recordForEdit = null,
  addOrEdit = () => undefined,
}) => {
  const { values, setValues, handleInputChange, resetForm } = useForm(
    attendance,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addOrEdit(values, resetForm);
  };

  useEffect(() => {
    //  need to format of datetime
    const theData = blankAttendance;
    if (recordForEdit != null) {
      theData.attendance_date = formatToDate(recordForEdit.attendance_date);
      theData.start_time = formatToTime(recordForEdit.start_time);
      theData.end_time = formatToTime(recordForEdit.end_time);
      setValues({
        ...theData,
      });
    }
  }, [recordForEdit]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <FormControls.DateInput
              name="attendance_date"
              label="出勤日"
              value={values.attendance_date}
              color="primary"
              onChange={handleInputChange}
            />
            <FormControls.TimeInput
              name="start_time"
              label="出勤日時"
              value={values.start_time}
              color="primary"
              onChange={handleInputChange}
            />
            <FormControls.TimeInput
              name="end_time"
              label="退勤日時"
              value={values.end_time}
              color="secondary"
              onChange={handleInputChange}
            />
            <FormControls.Select
              name="attendance_class"
              label="出勤区分"
              value={values.attendance_class}
              onChange={handleInputChange}
              options={getAttendanceOptions()}
            />
            <FormControls.TextInput
              name="notes"
              label="メモ"
              value={values.notes}
              onChange={handleInputChange}
            />
            <div>
              <FormControls.FormButton type="submit" text="SUBMIT" />
              <FormControls.FormButton
                type="reset"
                color="default"
                text="RESET"
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

export default AttendanceForm;
