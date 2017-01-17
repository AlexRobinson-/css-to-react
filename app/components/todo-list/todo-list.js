import React from 'react';
import './todo-list.css'
import {
  Container,
  Heading,
  List,
  ListItem
} from '!./../app/react-style-loader!css-loader?modules!./todo-list.css'

const TodoList = ({ todos }) => (
  <Container>
    <Heading>Todo list</Heading>
    <List>
      { todos.map(todo => <ListItem>{todo}</ListItem>) }
    </List>
  </Container>
)

export default TodoList
