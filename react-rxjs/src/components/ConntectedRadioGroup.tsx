import React, { useCallback } from 'react';
import { StateProps } from './props';
import './common.css';
import { useFormField } from '../state';

export interface RadioGroupOption {
  label: string;
  value: number;
}
interface Props extends StateProps {
  label: string;
  options: RadioGroupOption[];
}

export const ConnectedRadioGroup: React.FC<Props> = (props) => {
  const { label, options, statePath } = props;

  const [value, setValue] = useFormField('gender');
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(+e.target.value);
    },
    [setValue]
  );

  return (
    <div className="form-field">
      <label>
        {label}
        <fieldset>
          {options.length === 0 ? (
            <em>No options</em>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;
              return (
                <label key={`${option.label}(${option.value})`}>
                  <input
                    type="radio"
                    value={option.value}
                    name={statePath}
                    checked={isSelected}
                    onChange={onChange}
                  />
                  {option.label}
                </label>
              );
            })
          )}
        </fieldset>
      </label>
    </div>
  );
};
