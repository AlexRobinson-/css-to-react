import React from 'react'
import stuff from '!./react-style-loader!css-loader?modules!./app.css'

const { Container, Header, Logo, ImageContainer } = stuff;
console.log(stuff);

const App = () => (
  <Container>
    <Header>This is a test</Header>
    <ImageContainer>
      <Logo src={'http://www.cat-breeds-encyclopedia.com/images/british-kittens.jpg'} />
    </ImageContainer>
  </Container>
)

export default App;

