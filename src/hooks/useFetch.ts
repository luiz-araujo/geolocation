import useSWR, { ConfigInterface } from 'swr';
import api from '../services/api';

export function useFetch<Data = unknown, Error = unknown>(
  url: string,
  options?: ConfigInterface,
) {
  const { data, error, isValidating, mutate } = useSWR<Data, Error>(
    url,
    async route => {
      const response = await api.get(route);

      return response.data;
    },
    options,
  );

  return { data, error, isValidating, mutate };
}
