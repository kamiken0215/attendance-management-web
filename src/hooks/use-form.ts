import { useState } from 'react';

export const useForm = (initialValue: any) => {
  const [values, setValues] = useState(initialValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValue);
  };

  return {
    values,
    setValues,
    handleInputChange,
    resetForm,
  };
};
