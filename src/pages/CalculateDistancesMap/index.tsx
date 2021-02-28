import React, { useCallback, useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { FiRefreshCcw } from 'react-icons/fi';

import { useFetch } from '../../hooks/useFetch';
import Loading from '../../components/Loading';
import { Container, RefreshButton, MapContainer } from './styles';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../../images/logo-centauro.svg';
import mapIconHome from '../../utils/mapIconHome';
import mapIconShop from '../../utils/mapIconShop';

interface GeoData {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  status?: boolean;
  isShop?: boolean;
  closeness?: number;
}

const CalculateDistancesMap: React.FC = () => {
  const { data: calculateDistance, error } = useFetch<GeoData[]>('users');
  const [usersGeo, setUsersGeo] = useState<GeoData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<GeoData[]>([]);
  const [reloadPage, setReloadPage] = useState(true);
  const handleClick = () => setReloadPage(true);

  const generateMarkers = useCallback((data: GeoData[]) => {
    const indexClientAddress = Math.floor(Math.random() * data.length);

    const users = data
      .map(({ id, name, latitude, longitude }, index) => {
        return {
          closeness: Math.sqrt(
            Math.pow(latitude - data[indexClientAddress].latitude, 2) +
            Math.pow(longitude - data[indexClientAddress].longitude, 2)
          ),
          id,
          name,
          latitude,
          longitude,
          isShop: indexClientAddress === index ? true : false,
        };
    })
    .sort((a, b) => +(a.closeness) - (+b.closeness));

    setFilteredUsers(users);

  }, [],);

  useEffect(() => {
    if (calculateDistance) {
      const users = calculateDistance
        .filter(({ status }) => status)
        .map(({ id, name, latitude, longitude }) => {
          return {
            id,
            name,
            latitude,
            longitude,
          };
        });

      setUsersGeo(users);
      generateMarkers(users);
    }
  }, [calculateDistance, generateMarkers]);

  useEffect(() => {
    if (reloadPage) {
      generateMarkers(usersGeo);
      setReloadPage(false);
    }
  }, [reloadPage, generateMarkers, usersGeo]);

  if (error) return <h2> Some error occured </h2>;

  if (!calculateDistance) {
    return <Loading />;
  }

  return (
    <Container>
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Centauro" />
          <h2>Qual a loja mais próxima do consumidor</h2>
          <p>Veja quais são as lojas mais próximas de você!</p>
        </header>

        <footer>
          <strong>Clique no botão <FiRefreshCcw size={24} color="#FFF" /></strong>
          <span>para atualizar o cenário</span>
        </footer>
      </aside>

      <MapContainer>
        <Map
          center={[-23.6426809, -46.5795246]}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          {filteredUsers.map(({ id, isShop, latitude, longitude, name }, index) => {
            return (
              <Marker
                key={id}
                icon={isShop === true ? mapIconHome : mapIconShop}
                position={[latitude, longitude]}
              >
                <Tooltip
                  direction="bottom"
                  offset={[7, 4]}
                  opacity={1}
                  className={'tooltip-title'}
                  permanent
                >
                  {isShop === true ? `Endereço do cliente` : `${index}º ${name}`}
                </Tooltip>
              </Marker>
            );
          })}
        </Map>
      </MapContainer>

      <RefreshButton onClick={handleClick}>
        <FiRefreshCcw size={32} color="#FFF" />
      </RefreshButton>
    </Container>
  );
};

export default CalculateDistancesMap;
