import R3F from './Components/R3F/R3F';
import UI from './Components/UI/UI';
import GlobalStyle from './Styles/GlobalStyle';
import AuthProvider from './context/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <R3F />
      <UI />
    </AuthProvider>
  );
};

export default App;
