import React from 'react';
import { ConnectedRadioGroup, ConnectedTextInput } from '../components';
import { FormStateProvider } from '../state';

export const Form: React.FC = () => {
  return (
    <FormStateProvider initialValues={{}}>
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
    </FormStateProvider>
  );
};
