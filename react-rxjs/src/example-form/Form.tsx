import React from 'react';
import { ConnectedRadioGroup, ConnectedTextInput } from '../components';

export const Form: React.FC = () => {
  return (
    <div>
      <ConnectedTextInput label="Name: " statePath="name" />
      <ConnectedRadioGroup
        label="Gender: "
        statePath="gender"
        options={[
          { label: 'Secret', value: 0 },
          { label: 'Male', value: 1 },
          { label: 'Female', value: 2 },
        ]}
      />
    </div>
  );
};
