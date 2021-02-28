import React from 'react';

import { Container } from './styles';

import loading from '../../images/loading.gif';

const Loading: React.FC = () => {
  return (
    <Container>
      <img src={loading} alt="Carregando" />
    </Container>
  );
};

export default Loading;
