import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import rootReducer from 'reducers';

/**
 * A function for tests that deal with connected components.
 * You can provide initialState for the entire store that the ui is rendered with
 *
 * Sources:
 * https://testing-library.com/docs/example-react-redux
 *
 * @note compared with mock store in utils/test-utils.js
 * (uses configureMockStore from 'redux-mock-store')
 * the reducer structure does not seem to be defined correctly,
 * and the data from the mock API call does not get merged in right.
 */
export const renderWithRedux = (
  ui,
  { initialState, store = createStore(combineReducers({ ...rootReducer }), initialState, applyMiddleware(thunk)) } = {}
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  // adding `store` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  store,
});
