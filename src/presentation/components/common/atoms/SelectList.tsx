import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectList = (props: {
  columnDef: any;
  onFilterChanged: (rowId: string, filterValue: string) => void;
  items: [string, string][];
}) => {
  const { columnDef, onFilterChanged, items } = props;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onFilterChanged(columnDef.tableData.id, event.target.value as string);
  };

  return (
    <FormControl>
      <Select onChange={handleChange}>
        {items.map((item) => (
          <MenuItem key={item[0]} value={item[0]}>
            {item[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectList;
