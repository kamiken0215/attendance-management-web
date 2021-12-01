import React, { FC } from 'react';
import MaterialTable, { Action, Column, Icons } from 'material-table';
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
      fontWeight: '500',
    },

    '& tbody tr:hover': {
      cursor: 'pointer',
      backgroundColor: '#f5f5f5 !important',
    },
  },
}));

type props = {
  options: {};
  title?: string;
  totalCount?: number;
  columns: any[];
  data: [];
  cellEditable?: {
    cellStyle?: React.CSSProperties;
    onCellEditApproved: (
      newValue: any,
      oldValue: any,
      rowData: object,
      columnDef: Column<object>,
    ) => Promise<void>;
  };
  actions?: (Action<object> | ((rowData: object) => Action<object>))[];
  rowAddHandler?: (newData: any) => void;
  rowUpdateHandler?: (newData: any, oldData: any) => void;
  rowDeleteHandler?: (oldData: any) => void;
  icons?: Icons;
};
const waitTime = 600;
const DataTable: FC<props> = ({
  options = {},
  title = '',
  totalCount,
  columns = [{}],
  data = [],
  cellEditable,
  actions = [],
  rowAddHandler,
  rowUpdateHandler,
  rowDeleteHandler,
  icons,
}) => {
  const classes = useStyle();

  return (
    <div className={classes.table}>
      <MaterialTable
        options={options}
        style={{ maxHeight: '75vh', maxWidth: '100vw', overflow: 'scroll' }}
        title={title}
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                rowAddHandler(newData);
                resolve(newData);
              }, waitTime);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                rowUpdateHandler(newData, oldData);
                resolve(newData);
              }, waitTime);
            }),
          editTooltip: (rowData) => '編集',
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                rowDeleteHandler(oldData);
                resolve(oldData);
              }, waitTime);
            }),
          deleteTooltip: (rowData) => '削除',
        }}
        // cellEditable={cellEditable}
        localization={{
          header: { actions: '' },
          body: {
            editRow: {
              deleteText: 'このデータを削除してもよろしいでしょうか？',
            },
          },
        }}
        actions={actions}
        icons={icons}
      />
    </div>
  );
};

export default DataTable;
