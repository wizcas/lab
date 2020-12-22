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

export function useFormField<T = any>(
  statePath: string
): [T | undefined, (newValue: T) => void] {
  const ctx = useContext(FormStateContext);
  if (ctx == null) {
    throw new Error('must be called within the scope of a provider');
  }
  // Creates an observer who emits when the value on `statePath` is changed
  const observer = useMemo(
    () =>
      ctx.pipe(
        map((formState) => get(formState, statePath)),
        distinctUntilChanged((a, b) => isEqual(a, b))
      ),
    [ctx, statePath]
  );
  // Wraps the publish function for easy use
  const setValue = useCallback(
    (fieldValue: any) => {
      ctx.next(set(statePath, fieldValue, ctx.getValue()));
    },
    [ctx, statePath]
  );
  // Ask for re-rendering by updating the inner state
  const [value, setInnerState] = useState(undefined);
  useLayoutEffect(() => {
    const subscription = observer.subscribe((v) => setInnerState(v));
    return () => {
      subscription.unsubscribe();
    };
  }, [observer]);
  return [value, setValue];
}
