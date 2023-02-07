import { useContext, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import styled from 'styled-components';
import TodoContext from '../../Contexts/TodoContext';
import Contents from './Contents';

const Wrapper = styled.div`
  height: 160px;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  `;

const StyledUl = styled.ul`
  width: 100%;
  height: 120px;
  overflow-x: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 1rem;
    background-color: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: ${props => props.stared ? '#5E5336' : '#5E89FB'};
    background-clip: padding-box;
    border: .35rem solid transparent;
  }
`;

const InputBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  flex: 1;
  height: 35px;
  margin-bottom: 5px;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 2px solid ${props => props.stared ? '#5E5336' : '#5E89FB'};
  color: ${props => props.stared ? '#5E5336' : '#fdfdfd'};

  ::placeholder {
    color: ${props => props.stared ? '#5E5336' : '#efefef'};
  }
`;

const StyledButton = styled.button`
  width: 10%;
  height: 70%;
  margin: 0 10px;
  cursor: pointer;
  color: white;
  background-color: ${props => props.stared ? '#5E5336' : '#5E89FB'};
  border: none;
  border-radius: 6px;

  :hover {
    background-color: ${props => props.stared ? '#80784D' : '#4A6BC7'};
  }

  @media screen and (max-width: 1200px) {
    width: 20%;
  }
`;

function Detail(props) {
  const { todo: { contents, id, stared } } = props;
  const [value, setValue] = useState('');

  const { todos, setTodos } = useContext(TodoContext);

  const handleSubmit = id => {
    const newTodos = todos.map(todo => {
      if (id === todo.id) {
        todo.contents.push({content: value, contentChecked: false, id: uuidv4()});
      }
      return todo;
    })  
    setTodos(newTodos);
    setValue('');
  };

  return (
    <Wrapper>
      <StyledUl stared={stared}>
        {contents.map(content => <Contents key={content.id} content={content} stared={stared} />)}
      </StyledUl>
      <InputBoxWrapper stared={stared}>
        <label htmlFor='contentInputBox' />
        <StyledInput type="text" id='contentInputBox'
          placeholder='세부 항목을 입력하세요.'
          value={value}
          stared={stared}
          onChange={e => setValue(e.target.value)}
          spellCheck={false}
          autoComplete='off'
          onKeyUp={e => {if(e.key === 'Enter' && value) handleSubmit(id)}}
          />
        <StyledButton type='button'
          stared={stared}
          disabled={!value}
          onClick={() => handleSubmit(id)}
        >추가</StyledButton>
      </InputBoxWrapper>
    </Wrapper>
  );
}

export default Detail;