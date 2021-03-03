import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  width: 100vw;

  aside {
    background: linear-gradient(329.54deg, #7c051f 0%, #be0f34 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 80px;
    width: 440px;

    h2 {
      font-size: 40px;
      font-weight: 800;
      line-height: 42px;
      margin-top: 64px;
    }

    p {
      line-height: 28px;
      margin-top: 24px;
    }

    footer {
      display: flex;
      flex-direction: column;
      line-height: 24px;

      strong {
        display: flex;
        font-weight: 800;

        > svg {
          margin-left: 8px;
        }
      }
    }
  }

  .leaflet-container {
    z-index: 1;
  }
`;

export const RefreshButton = styled.button`
  align-items: center;
  background-color: #be0f34;
  border: 0;
  border-radius: 20px;
  bottom: 40px;
  display: flex;
  height: 64px;
  justify-content: center;
  position: absolute;
  transition: 0.3s;
  right: 40px;
  width: 64px;
  z-index: 2;

  &:hover {
    background-color: #7c051f;
  }
`;

export const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;

  > div {
    height: 100%;
  }

  .tooltip-title {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 7px;
    box-shadow: none;
    color: #2d3e50;
    font: 700 14px Nunito, sans-serif;
  }
`;
