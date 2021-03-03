import React from 'react';
import { render } from '@testing-library/react';

import Loading from '../../components/Loading';

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByRole } = render(<Loading />);

    expect(getByRole('img', { name: /carregando/i })).toHaveAttribute('alt');
    expect(getByRole('img', { name: /carregando/i })).toBeInTheDocument();
  });
});
