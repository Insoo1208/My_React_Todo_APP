import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  margin: 10px 0;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: azure;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledTitle = styled.h1`
  padding: 15px 5px;
  font-weight: bold;
`;

const StyledContent = styled.p`
  padding: 10px 5px;
`;

function TodoItems(props) {
  const { todo: { title, content } } = props;
  return (
    <Wrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledContent>{content}</StyledContent>
    </Wrapper>
  );
}

export default TodoItems;