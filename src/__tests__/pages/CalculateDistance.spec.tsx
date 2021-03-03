import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { FiRefreshCcw } from 'react-icons/fi';

import api from '../../services/api';

import CalculateDistancesMap from '../../pages/CalculateDistancesMap';
import { useFetch } from '../../hooks/useFetch';
import { GeoData } from '../../pages/CalculateDistancesMap';
import { RefreshButton } from '../../pages/CalculateDistancesMap/styles';

const apiMock = new MockAdapter(api);
const mockedEmptyUseFetch: GeoData[] = [];
const mockedUseFetch: GeoData[] = [
  {
    id: 1,
    name: 'local mais próximo',
    latitude: -23.642554619533417,
    longitude: -46.576968813565756,
    status: true,
  },
  {
    id: 2,
    name: 'local mais próximo',
    latitude: -23.63909,
    longitude: -46.566891,
    status: true,
  },
];

jest.mock('../../hooks/useFetch', () => ({
  useFetch: jest.fn(),
}));

describe('Calculate distance component fails', () => {
  beforeEach(() => {
    useFetch.mockReturnValue({
      data: mockedEmptyUseFetch,
      error: true,
    });
  });

  it('should display an error message when render fails', async () => {
    apiMock.onPost('users').replyOnce(404, {});
    render(<CalculateDistancesMap />);
    const { result } = renderHook(() => useFetch('users'));
    await waitFor;
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeTruthy();
    expect(
      screen.getByRole('heading', {
        name: /some error occured/i,
      }),
    ).toBeInTheDocument();
  });
});

describe('Calculate distance component render', () => {
  beforeEach(() => {
    useFetch.mockReturnValue({
      data: mockedUseFetch,
      error: false,
    });
  });

  it('should be able to render map', () => {
    render(<CalculateDistancesMap />);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should refresh map when button clicked', async () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <RefreshButton onClick={handleClick} aria-label="refresh-map">
        <FiRefreshCcw size={32} color="#FFF" />
      </RefreshButton>,
    );

    const buttonElement = getByRole('button', { name: /refresh-map/i });
    fireEvent.click(buttonElement);

    expect(buttonElement).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('Calculate distance component loading', () => {
  beforeEach(() => {
    useFetch.mockReturnValue({
      error: false,
    });
  });

  it('should display an loading icon when render is in progress', () => {
    render(<CalculateDistancesMap />);
    expect(screen.getByRole('img', { name: /carregando/i })).toHaveAttribute(
      'alt',
    );
    expect(
      screen.getByRole('img', { name: /carregando/i }),
    ).toBeInTheDocument();
  });
});
