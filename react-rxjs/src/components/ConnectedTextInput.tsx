import React, { useCallback } from 'react';
import { useFormField } from '../state';
import { StateProps } from './props';

interface Props extends StateProps {
  label: string;
}

export const ConnectedTextInput: React.FC<Props> = (props) => {
  const { label } = props;
  const [value, setValue] = useFormField('name');
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );
  return (
    <div className="form-field">
      <label>
        {label}
        <input type="text" value={value ?? ''} onChange={onChange} />
      </label>
    </div>
  );
};
