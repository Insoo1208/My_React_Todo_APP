import reset from "styled-reset";
import styled, {createGlobalStyle} from 'styled-components';
import MainPage from "./Components/MainPage";

const GlobalStyle = createGlobalStyle`
  // reset Css
  ${reset}

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
    user-select: none;
  }
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  font-size: 24px;
  font-weight: bold;
  color: green;
  background-color: aquamarine;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledHeader>
        Insoo's TODO-APP
      </StyledHeader>
      <MainPage />
    </>
  );
}

export default App;
