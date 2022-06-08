import { Box, Skeleton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { getGeoLocation } from '@common/util';
import SkeletonRooms from '@components/SearchResult/SkeletonRooms';

const { kakao } = window;

const wrapperStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  height: '100vh',
  marginTop: '5.875rem',
};

const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });

export default function SearchResultPage() {
  const mapRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [userGeolocation, setUserGeoLocation] = useState([]);

  useEffect(() => {
    const getUserGeoLocation = async () => {
      if (!userGeolocation.length) {
        const {
          coords: { latitude, longitude },
        } = await getGeoLocation();
        setUserGeoLocation([latitude, longitude]);
      }
    };
    getUserGeoLocation();
  }, []);

  useEffect(() => {
    const fetchMap = async () => {
      setIsLoading(true);
      await delay(2000); // 의도적으로 로딩 보여지게 함
      kakao.maps.load(() => {
        const [userLatitude, userLongitude] = userGeolocation;
        const mapOptions = {
          center: new kakao.maps.LatLng(userLatitude, userLongitude),
          level: 3,
        };
        const map = new kakao.maps.Map(mapRef.current, mapOptions);
      });
      setIsLoading(false);
    };
    if (userGeolocation.length) {
      fetchMap();
    }
  }, [userGeolocation]);

  return (
    <Box sx={wrapperStyle}>
      <SkeletonRooms />
      <Box ref={mapRef}>
        {isLoading && <Skeleton variant="rectangular" height="100%" />}
      </Box>
    </Box>
  );
}
