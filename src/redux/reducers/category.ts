import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";

const initialState = {
  list: []
};

export default function(state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      const item = { id, content, completed: false };
      return {
        ...state,
        list: [...state.list, item]
      };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      const item = state.list.find((i: any) => i.id === id);
      item.completed = !item.completed;
      return {
        ...state,
        list: [...state.list, item]
      };
    }
    default:
      return state;
  }
}
