import { connect, ConnectedProps } from 'react-redux';
import { RootStore } from 'redux/store.interface';
import { AddTodo } from 'redux/actions';

const mapState = (state: RootStore) => {
  console.log('state', state);
  return {
    list: state.todos.list
  };
};

const mapDispatch = {
  AddTodo
};

export const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;