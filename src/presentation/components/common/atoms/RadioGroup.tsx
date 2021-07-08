import React, { FC } from 'react';

type RadioGroupProps = {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  items: {};
};

const RadioGroup: FC<RadioGroupProps> = ({
  name = '',
  label = '',
  value = '',
  onChange = () => undefined,
  items = {},
}) => {
  return <div></div>;
};

export default RadioGroup;
