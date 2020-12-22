import get from 'lodash/get';
import set from 'lodash/fp/set';
import isEqual from 'fast-deep-equal';
import {
  useContext,
  useMemo,
  useCallback,
  useState,
  useLayoutEffect,
} from 'react';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { FormStateContext } from './store';

export function useFormField(
  statePath: string
): [any, (newValue: any) => void] {
  const ctx = useContext(FormStateContext);
  if (ctx == null) {
    throw new Error('must be called within the scope of a provider');
  }
  const observer = useMemo(
    () =>
      ctx.pipe(
        map((formState) => get(formState, statePath)),
        distinctUntilChanged((a, b) => isEqual(a, b))
      ),
    [ctx, statePath]
  );
  const setValue = useCallback(
    (fieldValue: any) => {
      ctx.next(set(statePath, fieldValue, ctx.getValue()));
    },
    [ctx, statePath]
  );
  const [value, setInnerState] = useState(undefined);
  useLayoutEffect(() => {
    const subscription = observer.subscribe((v) => setInnerState(v));
    return () => {
      subscription.unsubscribe();
    };
  }, [observer]);
  return [value, setValue];
}
