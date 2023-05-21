import sass from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import { Dispatch, FC, SetStateAction, Suspense, lazy, useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import { NotFound } from "../../pages/NotFound/NotFound";
import { AppDispatch } from "../../types/AppDispatch";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/operations";
import Tweets from "../../pages/Tweets/Tweets";

const LazyHome = lazy(() => import("../../pages/Home/Home"));

const App: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(3);
  const dispatch: AppDispatch = useDispatch();
    
  useEffect(() => {
    const controller: AbortController = new AbortController();
    dispatch(fetchUsers({ page, limit, controller }));

    return () => {
      controller.abort();
    }
  }, [page, limit, dispatch]);

  return (
    <div className={sass.App}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyHome />
              </Suspense>} />
              <Route 
                path="/tweets"
                element={<Tweets page={page} setPage={setPage as Dispatch<SetStateAction<number>>} />} />
              <Route element={<NotFound />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
