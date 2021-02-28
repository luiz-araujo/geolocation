import Leaflet from 'leaflet';
import mapMarkerImg from '../images/centauro-marker.svg';

const mapIconShop = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [47.25, 62.5],
  iconAnchor: [16.5, 60],
  popupAnchor: [170, 2],
});

export default mapIconShop;
