import React from 'react';
import {
  Block,
  Container,
  Heading,
  List,
  ListItem,
} from './todo-list.css'


const TodoList = ({ todos }) => (
  <Container>
    <Block>Testing stuff</Block>
    <Heading>Todo list</Heading>
    <List>
      { todos.map(todo => <ListItem>{todo}</ListItem>) }
    </List>
  </Container>
)

const TodoListOld = ({ todos }) => (
  <div className={styles.Container}>
    <div className={styles.Block}>Testing stuff</div>
    <h3 className={styles.Heading}>Todo list</h3>
    <ul className={styles.List}>
      { todos.map(todo => <li className={styles.ListItem}>{todo}</li>) }
    </ul>
  </div>
)

export default TodoList
