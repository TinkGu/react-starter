import './styles/global.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import { configureStore } from './store';
import { fontResize } from 'utils/font-resize';

function main() {
  fontResize();
  const store: any = configureStore();

  const RootComponent = () => {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  };

  render(<RootComponent />, document.getElementById('app'));
}

main();
