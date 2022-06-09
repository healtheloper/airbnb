import { Box, Skeleton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getGeoLocation, delay } from '@common/util';
import Rooms from '@components/SearchResult/Rooms';
import SkeletonRooms from '@components/SearchResult/SkeletonRooms';

const { kakao } = window;

const wrapperStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  height: '100vh',
  marginTop: '5.875rem',
};

export default function SearchResultPage() {
  const mapRef = useRef();
  const location = useLocation();
  const [roomList, setRoomList] = useState([]);
  const [searchDataList, setSearchDataList] = useState<any>({
    check_in: '',
    check_out: '',
    price_min: 0,
    price_max: 0,
    adult: 0,
    child: 0,
    baby: 0,
    page: 0,
    limit: 0,
    cached_count: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userGeolocation, setUserGeoLocation] = useState<number[]>([]);

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

  useEffect(() => {
    // location.state의 값으로 서버에 파라미터 담아서 비동기 요청
    setSearchDataList(location.state);
    fetch('/api/rooms')
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          setRoomList(res.data);
        }
      });
  }, []);

  return (
    <Box sx={wrapperStyle}>
      {roomList ? (
        <Rooms roomList={roomList} searchDataList={searchDataList} />
      ) : (
        <SkeletonRooms />
      )}
      <Box ref={mapRef}>
        {isLoading && <Skeleton variant="rectangular" height="100%" />}
      </Box>
    </Box>
  );
}
