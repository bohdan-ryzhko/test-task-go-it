import sass from "./App.module.scss";
import { Container } from "../Container/Container";
import { Header } from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import Home from "../../pages/Home/Home";
import Tweets from "../../pages/Tweets/Tweets";

const App:FC = () => {
  return (
    <div className={sass.App}>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tweets" element={<Tweets />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;