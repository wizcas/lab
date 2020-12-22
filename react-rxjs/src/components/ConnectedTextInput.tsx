import React, { useCallback } from 'react';
import { StateProps } from './props';

interface Props extends StateProps {
  label: string;
}

export const ConnectedTextInput: React.FC<Props> = (props) => {
  const { label } = props;
  const value = 'xxx'; // get from the state
  const onChange = useCallback(() => {
    // submit to state
  }, []);
  return (
    <div className="form-field">
      <label>
        {label}
        <input type="text" value={value} onChange={onChange} />
      </label>
    </div>
  );
};
