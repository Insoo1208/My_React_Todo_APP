import { useContext } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TodoContext from '../Contexts/TodoContext';
import AddTodo from './AddTodo';
import TodoItems from './Items/TodoItems';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;

  & > div {
    height: 99%;
    border-radius: 8px;
    width: 45%;
    background-color: #34383E;
  }

  .Completed .banner {
    height: 75px;
    background-color: #4A6BC7;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: larger;
    font-weight: bold;
    color: #efefef;
    border-radius: 8px 8px 0 0;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    row-gap: 1rem;
    height: auto;
    
    .InProgress, .Completed {
      width: 100%;
    }
  }
`;

const TodoWrapper = styled.ul`
  width: 100%;
  height: calc(100% - 75px - 1.5rem);
  overflow-y: scroll;
  border-radius: 8px;

  ::-webkit-scrollbar {
    width: 1.5rem;
    background-color: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: #4A6BC7;
    background-clip: padding-box;
    border: .5rem solid transparent;
  }
`;

function TodoList() {
  const { todos, setTodos } = useContext(TodoContext);

  const handleTodo = checkedvalue => {
    let isStarred = [];
    let notStarred = [];

    todos[checkedvalue].forEach((todo, index) => {
      if (todo.starred) isStarred.push(
        <motion.li
          layout
          key={todo.id}
          initial = {{ scale: 0 }}
          animate = {{ scale: 1 }}
          exit = {{ scale: 0 }}
          transition={{ type: "Inertia" }}
        >
          <TodoItems key={todo.id} todo={todo} index={index}/>
        </motion.li>
      );
      else if (!todo.starred) notStarred.push(
        <motion.li
          layout
          key={todo.id}
          initial = {{ scale: 0 }}
          animate = {{ scale: 1 }}
          exit = {{ scale: 0 }}
          transition={{ type: "Inertia" }}
        >
          <TodoItems key={todo.id} todo={todo} index={index}/>
        </motion.li>
      );
    });

    return isStarred.concat(notStarred);
  };

  const onDragEnd = result => {
    const { destination, source } = result;

    if(!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    ) return;

    if (destination.droppableId !== source.droppableId) {
      const oldTodos = [...todos[source.droppableId]];
      const newTodos = [...todos[destination.droppableId]];
      const tmp = oldTodos.slice(source.index, source.index + 1);
      tmp[0].isChecked = !tmp[0].isChecked;
      oldTodos.splice(source.index, 1)
      newTodos.splice(destination.index, 0, ...tmp);
      setTodos({...todos, [source.droppableId]: oldTodos, [destination.droppableId]: newTodos});
    }
    else if (destination.droppableId === source.droppableId) {
      const newTodos = [...todos[destination.droppableId]];
      const tmp = newTodos.slice(source.index, source.index + 1);
      newTodos.splice(source.index, 1);
      newTodos.splice(destination.index, 0, ...tmp);
      setTodos({...todos, [destination.droppableId]: newTodos});
    };
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='InProgress'>
          {provided => (
            <div className="InProgress"
              {...provided.droppableProps} ref={provided.innerRef}
            >
              <AddTodo />
              <TodoWrapper>
                <AnimatePresence mode='popLayout'>
                  {handleTodo('InProgress')}
                </AnimatePresence>
                {provided.placeholder}
              </TodoWrapper>
            </div>)
          }
        </Droppable>
        <Droppable droppableId='Completed'>
          {provided => (
            <div className="Completed"
              {...provided.droppableProps} ref={provided.innerRef}
            >
              <div className="banner">완료한 할 일.</div>
              <TodoWrapper>
                <AnimatePresence mode='popLayout'>
                  {handleTodo('Completed')}
                </AnimatePresence>
                {provided.placeholder}
              </TodoWrapper>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
}

export default TodoList;