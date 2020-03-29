import React from 'react'

import logo from '../../assets/images/logo.svg'
import mail from '../../assets/images/icon_email.svg'
import phone from '../../assets/images/icon_tlm.svg'
import megaphone from '../../assets/images/icon_nome.svg'

import {
  Container,
  Logo,
  Store,
  Queue,
  QueueDate,
  CodeContainer,
  Options,
  ImagesContainer,
  Images,
  Slogan
} from './styles'

export default function PosterContent() {
  return (
    <Container>
    <Logo >
    <img src={logo} alt="Logo" />
  </Logo>

  <Store>
    Pingo Doce Albufeira
  </Store>

  <Queue>
    Código da Fila
  </Queue>

  <QueueDate>
    25 de março 2020
  </QueueDate>

  <CodeContainer>
    <span>123123123123123</span>
  </CodeContainer>

  <Options>Entre <span> nafila </span> com...</Options>

  <ImagesContainer>
    <Images>
      <img src={mail} alt="Email" />
      <span>Email</span>
    </Images>
    <Images>
      <img src={phone} alt="Mobile" />
      <span>SMS</span>
    </Images>
    <Images>
      <img src={megaphone} alt="Megaphone" />
      <span>Nome</span>
    </Images>
  </ImagesContainer>

  <Slogan><span>naFila</span>, sem filas.</Slogan>
    </Container>
  )
}
