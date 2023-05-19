import sass from "./App.module.scss";
import { Tweets } from '../Tweets/Tweets';
import { Container } from "../Container/Container";

function App() {
  return (
    <div className={sass.App}>
      <Container>
        <Tweets />
      </Container>
    </div>
  );
}

export default App;
