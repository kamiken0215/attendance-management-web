import { Grid, Input } from '@material-ui/core';
import React, { FC } from 'react';
import { Attendance } from '../../../../entities/Attendance';
import { FormControls } from '../../common/atoms/FormControls';
import { Form } from '../../common/form/Form';
import { getAttendanceOptions } from '../../../../entities/Attendance';
import { DatePicker, DateTimePicker } from '@material-ui/pickers';
import { DateTimeInput } from '../../common/atoms/DateTimePicker';
import { Attendances, blankData } from '../../../../entities/Attendances';

type props = {
  values: Attendances;
  addOrEdit: (attendance: Attendances, resetForm: () => void) => void;
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
  values = blankData,
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => undefined,
  handleInputChange = () => undefined,
  resetForm = () => undefined,
}) => {
  console.log('form value is' + values);
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <FormControls.DateInput
              name="attendance_date"
              label="出勤日"
              value={values.attendanceDate}
              color="primary"
              onChange={handleInputChange}
            />
            <FormControls.DateTimeInput
              name="startTime"
              label="出勤日時"
              value={values.startTime}
              handleOnChange={handleInputChange}
            />
            <FormControls.DateTimeInput
              name="endTime"
              label="退勤日時"
              value={values.endTime}
              handleOnChange={handleInputChange}
            />
            <FormControls.Select
              name="attendance_class"
              label="出勤区分"
              value={values.attendanceClassCode}
              onChange={handleInputChange}
              options={getAttendanceOptions()}
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
