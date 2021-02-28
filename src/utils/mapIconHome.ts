import Leaflet from 'leaflet';
import mapMarkerImg from '../images/home-marker.svg';

const mapIconHome = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [50, 50],
  iconAnchor: [16.5, 60],
  popupAnchor: [170, 2],
});

export default mapIconHome;
