import React, { useEffect, useMemo } from 'react';
import { BehaviorSubject } from 'rxjs';

type FormValues = Record<string, any>;

interface ProviderProps {
  initialValues: FormValues;
}

export const FormStateContext = React.createContext<BehaviorSubject<FormValues> | null>(
  null
);

export const FormStateProvider: React.FC<ProviderProps> = ({
  children,
  initialValues,
}) => {
  const store = useMemo(() => new BehaviorSubject<any>(initialValues), [
    initialValues,
  ]);
  useEffect(() => {
    const subscription = store.subscribe((values) =>
      console.log('store updated', values)
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <FormStateContext.Provider value={store}>
      {children}
    </FormStateContext.Provider>
  );
};
