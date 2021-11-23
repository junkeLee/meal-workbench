import { ADD_TODO } from './actionTypes';

let nextTodoId = 0;

export const AddTodo = (content: any) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});