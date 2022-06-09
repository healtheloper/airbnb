import { Box, Container } from '@mui/material';
import { useState, useEffect } from 'react';

import Background from '@components/Background';
import Footer from '@components/Footer';
import AnyWhereBox from '@components/Main/AnyWhereBox';
import NearByBox from '@components/Main/NearByBox';
import SkeletonNearByBox from '@components/Main/SkeletonNearByBox';

export interface NearByInfoProps {
  uuid: number;
  city: string;
  description: string;
  image: string;
}
export interface NearByDataProps {
  title: string;
  infos: NearByInfoProps[];
}

export default function MainPage() {
  const [nearData, setNearData] = useState<NearByDataProps>({
    title: '',
    infos: [],
  });
  const [categoryLocation, setcategoryLocation] = useState<NearByDataProps>({
    title: '',
    infos: [],
  });

  useEffect(() => {
    const fetchCategoryLocations = async () => {
      fetch('/api/categoryLocations')
        .then(res => res.json())
        .then(data => {
          setcategoryLocation(data);
        });
    };
    const fetchNearByData = async () => {
      fetch('/api/nearLocations')
        .then(res => res.json())
        .then(data => {
          setNearData(data);
        });
    };
    fetchNearByData();
    fetchCategoryLocations();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ margin: '0 auto' }}>
          <Background />
          <Box sx={{ marginBottom: '5rem' }}>
            {nearData.title ? (
              <NearByBox nearData={nearData} />
            ) : (
              <SkeletonNearByBox />
            )}
          </Box>
          <Box sx={{ marginBottom: '5rem' }}>
            <AnyWhereBox categoryLocation={categoryLocation} />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
