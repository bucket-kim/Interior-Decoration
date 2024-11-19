import UI from "./Components/UI/UI";
import { Fragment } from "react";
import GlobalStyle from "./Styles/GlobalStyle";
import R3F from "./Components/R3F/R3F";

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <UI />
      <R3F />
    </Fragment>
  );
};

export default App;
