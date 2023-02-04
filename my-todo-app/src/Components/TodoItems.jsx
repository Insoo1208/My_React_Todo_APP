import styled from 'styled-components';

const Wrapper = styled.div`
  width: calc(100% - 2rem);
  margin: 0 auto;
  height: 75px;
  border-radius: 8px;
  background-color: ${props => props.stared ? 'yellow' : 'azure'};
  color: ${props => props.stared ? 'black' : 'green'};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 1rem;
`;

const StyledTitle = styled.h1`
  padding: 10px 5px;
  font-weight: bold;
`;

const StyledContent = styled.p`
  padding: 6px 5px;
`;

function TodoItems(props) {
  const { todo: { title, content, stared } } = props;
  return (
    <Wrapper stared={stared}>
      <StyledTitle>{title}</StyledTitle>
      <StyledContent>{content}</StyledContent>
    </Wrapper>
  );
}

export default TodoItems;