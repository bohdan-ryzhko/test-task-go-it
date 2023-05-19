import sass from "./App.module.scss";
import { Tweets } from '../Tweets/Tweets';

function App() {
  return (
    <div className={sass.App}>
      <div className={sass.container}>
        <Tweets />
      </div>
    </div>
  );
}

export default App;
