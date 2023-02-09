import { useContext, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import styled from 'styled-components';
import { ImPlus } from 'react-icons/im';
import { useMediaQuery } from "react-responsive"
import { AnimatePresence } from 'framer-motion';
import TodoContext from '../../Contexts/TodoContext';
import Contents from './Contents';

const Wrapper = styled.div`
  height: 160px;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 450px) {
    padding-left: 1rem;
  }
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
    background-color: ${props => props.starred ? '#5E5336' : '#5E89FB'};
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
  border-bottom: 2px solid ${props => props.starred ? '#5E5336' : '#5E89FB'};
  color: ${props => props.starred ? '#5E5336' : '#fdfdfd'};

  ::placeholder {
    color: ${props => props.starred ? '#5E5336' : '#efefef'};
  }
`;

const StyledButton = styled.button`
  width: 10%;
  height: 70%;
  margin: 0 10px;
  cursor: pointer;
  color: white;
  background-color: ${props => props.starred ? '#5E5336' : '#5E89FB'};
  border: none;
  border-radius: 6px;

  :hover {
    background-color: ${props => props.starred ? '#80784D' : '#4A6BC7'};
  }

  @media screen and (max-width: 1200px) {
    width: 20%;
  }

  @media screen and (max-width: 450px) {
    width: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function Detail(props) {
  const { todo: { contents, id, starred }, todo } = props;
  const [value, setValue] = useState('');
  const { todos, setTodos } = useContext(TodoContext);
  const isSmallMobile = useMediaQuery({
    query : "(max-width:450px)"
  });

  const handleSubmit = id => {
    const checkedValue = todo.isChecked ? 'Completed' : 'InProgress';
    const newTodo = [...todos[checkedValue]];
    newTodo.map(todo => {
      if(id === todo.id) {
        todo.contents.push({content: value, contentChecked: false, id: uuidv4()});
      }
    });
    const newTodos = {...todos, [checkedValue]: newTodo};
    setTodos(newTodos);
    setValue('');
  };

  return (
    <Wrapper>
      <AnimatePresence mode='popLayout'>
        <StyledUl starred={starred}>
          {contents.map(content => <Contents key={content.id} content={content} starred={starred} todo={todo}/>)}
        </StyledUl>
      </AnimatePresence>
      <InputBoxWrapper starred={starred}>
        <label htmlFor='contentInputBox' />
        <StyledInput type="text" id='contentInputBox'
          placeholder='세부 항목을 입력하세요.'
          value={value}
          starred={starred}
          onChange={e => setValue(e.target.value)}
          spellCheck={false}
          autoComplete='off'
          onKeyUp={e => {if(e.key === 'Enter' && value) handleSubmit(id)}}
          />
        <StyledButton type='button'
          starred={starred}
          disabled={!value}
          onClick={() => handleSubmit(id)}
        >{isSmallMobile ? <ImPlus /> : '추가'}</StyledButton>
      </InputBoxWrapper>
    </Wrapper>
  );
}

export default Detail;