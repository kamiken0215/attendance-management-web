import React, {
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import useSearchAttendances from '../../hooks/use-search-attendances';
import AttendanceDataList from '../../components/Home/AttendanceDataList';
import { Grid, makeStyles } from '@material-ui/core';
import { UserContext } from '../../contexts/UserContext';
import SearchAttendanceForm from '../../components/Search/SearchAttendanceForm';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import SimpleSnackbar from '../../components/common/atoms/SimpleSnackbar';
import { format } from 'date-fns';
import { AttendancesContext } from '../../contexts/AttendancesContext';

const useStyle = makeStyles((theme) => ({
  formContent: {
    backgroundColor: '#393E46',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  table: {
    backgroundColor: '#393E46',
  },
}));

const Contents: FC = () => {
  const user = useContext(UserContext);
  const { reset, setAttendances, query, setQuery } = useContext(
    AttendancesContext,
  );
  const classes = useStyle();
  const [values, setValues] = useState({ q: '' });
  const { data, loading } = useSearchAttendances(user.user.id, values.q);
  let q: { q: string } = values;

  const { toggleSnack } = useContext(SnackbarContext);

  useEffect(() => {
    if (!data) {
      toggleSnack(true, 'error', 'データ取得失敗');
    }
  }, [data]);

  //  初回レンダリング時は当月のデータを表示
  useEffect(() => {
    setValues({ q: format(new Date(), 'yyyyMM') });
  }, []);

  const handleOnClick = (
    targetName: string,
    newValue: string,
    event?: SyntheticEvent,
  ) => {
    if (event) event.persist();
    q = { q: newValue };
    setValues((v) => ({ ...v, [targetName]: newValue }));
    setQuery(newValue);
    reset(newValue);
  };

  return (
    <div>
      <Grid container direction="column" alignItems="stretch">
        <Grid item xs={12}>
          <div className={classes.formContent}>
            <SearchAttendanceForm handleOnClick={handleOnClick} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.table}>
            <AttendanceDataList attendances={data} />
          </div>
        </Grid>
        <SimpleSnackbar />
      </Grid>
    </div>
  );
};

export default Contents;
