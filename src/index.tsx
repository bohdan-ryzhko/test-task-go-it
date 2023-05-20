import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { Layout } from './components/Layout/Layout';
import { persistor, store } from './redux/store';
import { Suspense, lazy } from 'react';
import { NotFound } from './pages/NotFound/NotFound';

// import React from 'react';

const LazyHome = lazy(() => import('./pages/Home/Home'));
const LazyTweets = lazy(() => import('./pages/Tweets/Tweets'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/test-task-go-it">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyHome />
              </Suspense>} />
              <Route path="/tweets" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyTweets />
                </Suspense>} />
              <Route element={<NotFound />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // {/* </React.StrictMode> */}
);



reportWebVitals();
