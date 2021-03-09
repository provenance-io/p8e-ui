import React, {  } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import { AppContainer } from 'AppContainer';
import * as serviceWorker from './serviceWorker';
import { GlobalStyle } from 'Constant/GlobalStyle';

const Root = () => {
  // const [mode] = useLocalStorage('themeMode', 'dark');
  const mode = 'light'

  return <ThemeProvider theme={{ mode, flow: 'dashboard' }}>
    <GlobalStyle />
    <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
      <AppContainer />
    </BrowserRouter>
  </ThemeProvider>
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
