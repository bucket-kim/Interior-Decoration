import { Fragment } from "react";
import R3F from "./Components/R3F/R3F";
import UI from "./Components/UI/UI";
import GlobalStyle from "./Styles/GlobalStyle";

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
