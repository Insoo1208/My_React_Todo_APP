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
    background-color: #17181C;
  }

  * {
    box-sizing: inherit;
    user-select: none;
  }
`;

const TodoWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 6rem;
  overflow: hidden;

  @media screen and (min-width: 768px) and (max-width: 1200px) {
    width: 768px;
  }

  @media screen and (max-width: 768px) {
    width: 500px;
    padding: 0 2rem;
  }
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
  color: #5E89FB;
  background-color: #24282E;
  border: 4px solid #5E89FB;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <TodoWrapper>
        <StyledHeader>
          Insoo's TODO-APP
        </StyledHeader>
        <MainPage />
      </TodoWrapper>
    </>
  );
}

export default App;
