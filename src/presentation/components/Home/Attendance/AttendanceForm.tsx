import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { Attendance } from '../../../../entities/Attendance';
import { FormControls } from '../../common/atoms/FormControls';
import { Form } from '../../common/form/Form';
import { getAttendanceOptions } from '../../../../entities/Attendance';

type props = {
  values: any;
  addOrEdit: (attendance: Attendance, resetForm: () => void) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>,
  ) => void;
  resetForm: () => void;
};

const AttendanceFormContainer: FC<props> = ({
  values = '',
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => undefined,
  handleInputChange = () => undefined,
  resetForm = () => undefined,
}) => {
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

export default AttendanceFormContainer;
