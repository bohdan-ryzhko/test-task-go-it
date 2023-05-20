import sass from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import { FC, Suspense, lazy } from "react";
import { Layout } from "../Layout/Layout";
import { NotFound } from "../../pages/NotFound/NotFound";

const LazyHome = lazy(() => import("../../pages/Home/Home"));
const LazyTweets = lazy(() => import("../../pages/Tweets/Tweets"));

const App: FC = () => {
  return (
    <div className={sass.App}>
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
    </div>
  );
}

export default App;
