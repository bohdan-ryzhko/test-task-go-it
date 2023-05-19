import sass from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import Home from "../../pages/Home/Home";
import Tweets from "../../pages/Tweets/Tweets";
import { Layout } from "../Layout/Layout";

const App: FC = () => {
  return (
    <div className={sass.App}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/tweets" element={<Tweets />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;