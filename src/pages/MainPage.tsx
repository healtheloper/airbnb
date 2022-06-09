import { Box, Container } from '@mui/material';
import { useState, useEffect } from 'react';

import { delay } from '@common/util';
import Background from '@components/Background';
import Footer from '@components/Footer';
import AnyWhereBox from '@components/Main/AnyWhereBox';
import NearByBox from '@components/Main/NearByBox';
import SkeletonNearByBox from '@components/Main/SkeletonNearByBox';
import { nearByData } from '@mocks/main';

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

  useEffect(() => {
    const fetchNearByData = async () => {
      await delay(1000);
      setNearData(nearByData);
    };
    fetchNearByData();
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
            <AnyWhereBox />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
