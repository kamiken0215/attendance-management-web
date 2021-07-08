import React, { FC } from 'react';
import MaterialTable, { Action } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    backgroundColor: '#393e46',

    '& thead th': {
      fontWeight: '600',
      color: '#566d7e',
      backgroundColor: '#f2f6fa',
    },

    '& tbody td': {
      fontWeight: '300',
    },

    '& tbody tr:hover': {
      cursor: 'pointer',
      backgroundColor: '#fffbf2',
    },
  },
}));

type props = {
  options: {};
  title?: string;
  columns: any[];
  data: [];
  actions?: (Action<object> | ((rowData: object) => Action<object>))[];
};

const DataTable: FC<props> = ({
  options = {},
  title = '',
  columns = [{}],
  data = [],
  actions = [],
}) => {
  const classes = useStyle();

  return (
    <div className={classes.table}>
      <MaterialTable
        options={options}
        title={title}
        columns={columns}
        data={data}
        localization={{
          header: { actions: '' },
        }}
        actions={actions}
      />
    </div>
  );
};

export default DataTable;
