Rxjs-Based React Form State Management
---

A simple demo of managing the form state and controlled inputs in React, based on Rxjs observables and data stream manipulating.

![Partial render effect](screenshot.gif)
_Partial re-rendering_

## What's the Benefit?

Rxjs provides a pub/sub pattern, and it's very powerful in manipulating the data as the data stream goes through. Such design makes a component capable of keeping an eye on only the data it cares.

When a single property, take `foo` as an example, in the store gets updated, only the components that subscribes the `foo` will be re-rendered.

## How It Works

The provider holds a root ***store*** (an instance of `BehaviorSubject`) who takes new data and emits to all the subscribers. Each subscriber listens to a `Observable`, a fancy name of _data stream_, that can transform data as the data flows by.

A basic data flow works like this:

1. Something submits a new value to the ***store***.
2. The ***store*** pushes the new values to any active observables.
3. Say, there is an observable that cares about only the `foo` property. It then gets the `foo`'s value out of the entire store object, through the `map` rxjs operator.
4. This observer continues to check if the new `foo` value is same as the previous one passing the stream by the rxjs operator `distinctUntilChanged` (with deep compare) .
5. If the two values are the same, the new value gets discarded. Any component that wants the `foo` value will not be re-rendered. In fact, they won't even know that there was an update to the store.
6. If the `foo` value is new, the new value will be set into an inner React state, causing the component re-rendered with the new value.

## Folders

`components`: a few _'Connected Components'_ who interacts with the form state store for retrieving and updating form field values.

`state`: the core part of state management, providing a subject-based _'store'_, a provider component, and a hook `useFormField()` for interacting with a single form field within a particular conntected component.

`example-form`: For composing the components together for the small demo.

## Run the Demo

```
$ yarn && yarn start
```