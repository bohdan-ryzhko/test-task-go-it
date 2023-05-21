import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import App from './components/App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/test-task-go-it">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();
