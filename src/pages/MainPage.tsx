import { Box, Container } from '@mui/material';
import { useState, useEffect } from 'react';

import Background from '@components/Background';
import Footer from '@components/Footer';
import CategoryLocations from '@components/Main/CategoryLocations';
import NearLocations from '@components/Main/NearLocations';
import SkeletonNearLocations from '@components/Main/SkeletonNearLocations';

export interface INearLocationsInfo {
  uuid: number;
  city: string;
  description: string;
  image: string;
}

export interface ICategoryLocationsInfo {
  uuid: number;
  image: string;
  description: string;
}

export interface IMainPageDatas<T> {
  title: string;
  infos: T[];
}

export default function MainPage() {
  const [nearLocations, setNearLocations] = useState<
    IMainPageDatas<INearLocationsInfo>
  >({
    title: '',
    infos: [],
  });
  const [categoryLocations, setCategoryLocations] = useState<
    IMainPageDatas<ICategoryLocationsInfo>
  >({
    title: '',
    infos: [],
  });

  useEffect(() => {
    const fetchCategoryLocations = async () => {
      fetch('/api/categoryLocations')
        .then(res => res.json())
        .then(data => {
          setCategoryLocations(data);
        });
    };
    const fetchNearLocations = async () => {
      fetch('/api/nearLocations')
        .then(res => res.json())
        .then(data => {
          setNearLocations(data);
        });
    };
    fetchNearLocations();
    fetchCategoryLocations();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ margin: '0 auto' }}>
          <Background />
          <Box sx={{ marginBottom: '5rem' }}>
            {nearLocations.title ? (
              <NearLocations nearLocations={nearLocations} />
            ) : (
              <SkeletonNearLocations />
            )}
          </Box>
          <Box sx={{ marginBottom: '5rem' }}>
            <CategoryLocations categoryLocations={categoryLocations} />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
