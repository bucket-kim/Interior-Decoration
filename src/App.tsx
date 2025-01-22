import { Fragment } from 'react';
import R3F from './Components/R3F/R3F';
import UI from './Components/UI/UI';
import GlobalStyle from './Styles/GlobalStyle';

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <R3F />
      <UI />
    </Fragment>
  );
};

export default App;
