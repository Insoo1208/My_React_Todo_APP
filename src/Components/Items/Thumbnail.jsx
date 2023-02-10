import styled from 'styled-components';
import { MdStar, MdStarOutline, MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from "react-icons/md";
import React, { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LinesEllipsis from 'react-lines-ellipsis';
import TodoContext from '../../Contexts/TodoContext';

const Wrapper = styled.div`
  display: flex;
  height: 4.5rem;
`;

const ContentsWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;

  .title {
    flex: 1;
    padding: 10px 5px;
    font-weight: bold;
  }
`;

const CheckWrapper = styled.div`
  width: 10%;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  div {
    width: 100%;
    text-align: center;
    margin: auto 0;
    cursor: pointer;
  }
`;

const Star = styled.div`
  color: ${props => props.starred ? '#5E5336' : '#FFD700'};
`;

const Check = styled.div`
  color: ${props => props.starred ? '#5E5336' : '#5E89FB'};
`;

const DeleteWrapper = styled.div`
  width: 7.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: ${props => props.starred ? '#5E5336' : '#efefef'};
  cursor: pointer;
`;

const CheckWarning = styled(motion.div)`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FF6666;
`;

function Thumbnail(props) {
  const { todo: { title, starred, isChecked, id }, todo, handleDetail } = props;
  const { todos, setTodos } = useContext(TodoContext);
  const [ContentWarn, setContentWarn] = useState(false);
  const checkedValue = todo.isChecked ? 'Completed' : 'InProgress';

  const deleteTodo = id => {
    const newTodo = todos[checkedValue].filter(todo => todo.id !== id);
    const newTodos = {...todos, [checkedValue]: newTodo};
    setTodos(newTodos);
  };

  const handleStar = id => {
    const newTodo = todos[checkedValue].map(todo => {
      if(todo.id === id) todo.starred = !todo.starred;
      return todo;
    });
    const newTodos = {...todos, [checkedValue]: newTodo};
    setTodos(newTodos);
  };

  const handleCheck = id => {
    const isAllChecked = todo.contents.reduce((acc, content) => content.contentChecked ? acc : false, true);

    if (isAllChecked) {
      const before = todo.isChecked ? 'Completed' : 'InProgress';
      const after = todo.isChecked ? 'InProgress' : 'Completed';

      todo.isChecked = !isChecked;

      const oldTodo = todos[before].filter(todo => todo.id !== id);
      const newTodo = todos[after].concat(todo);
      
      setTodos({ ...todos, [before]: oldTodo, [after]: newTodo });
    } else {
      setContentWarn(true);
      setTimeout(() => {
        setContentWarn(false);
      }, 1000);
    };
  };

  return (
    <>
      <Wrapper>
        <CheckWrapper>
          <Star className="star" onClick={() => handleStar(id)} starred={starred}>
            {starred ? <MdStar /> : <MdStarOutline /> }
          </Star>
          <Check className="check" onClick={() => handleCheck(id)} starred={starred} >
            {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </Check>
        </CheckWrapper>
        <ContentsWrapper onClick={handleDetail}>
          <LinesEllipsis
            className="title"
            text={title}
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        </ContentsWrapper>
        <DeleteWrapper starred={starred}>
          <MdRemoveCircleOutline onClick={() => deleteTodo(id)}/>
        </DeleteWrapper>
      </Wrapper>
      <AnimatePresence>
        {ContentWarn && 
          <CheckWarning
            key = 'CheckWarnning'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '2rem', opacity: 1,
              transition : {
                height : {
                  duration: .35,
                },
                opacity : {
                  delay: .3
                }
              }
            }}
            exit={{ height: 0, opacity : 0,
              transition : {
                height : {
                  delay: .25
                },
                opacity : {
                  duration: .15
                }
              }
            }}
          >모든 세부 항목을 완료해야 합니다.</CheckWarning>
        }
      </AnimatePresence>
    </>
  );
}

export default React.memo(Thumbnail);