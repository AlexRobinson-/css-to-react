import React from 'react'
import './app.css'
import { Container, Header, Logo, ImageContainer } from '!./react-style-loader!css-loader?modules!./app.css'
import TodoList from './../todo-list'

const App = () => (
  <Container>
    <Header>This is a test</Header>
    <TodoList todos={['do stuff', 'do some stuff']} />
    <ImageContainer>
      <Logo src={'http://www.cat-breeds-encyclopedia.com/images/british-kittens.jpg'} />
    </ImageContainer>
  </Container>
)

export default App;

