import { createContext } from "react";

const TodoContext = createContext({InProgress: [], Completed: []});
TodoContext.displayName = 'TodoContext';

export default TodoContext;