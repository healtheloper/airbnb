import { Box, Container } from '@mui/material';

import Background from '@components/Background';
import Footer from '@components/Footer';
import CategoryLocations from '@components/Main/CategoryLocations';
import NearLocations from '@components/Main/NearLocations';
import SkeletonNearLocations from '@components/Main/SkeletonNearLocations';
import useFetch, { ResponseState } from '@hooks/useFetch';

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

type NearLocationsResponse = ResponseState<IMainPageDatas<INearLocationsInfo>>;

type CategoryLocationsResponse = ResponseState<
  IMainPageDatas<ICategoryLocationsInfo>
>;

export default function MainPage() {
  const {
    isLoading: categoryLoading,
    data: categoryLocations,
  }: CategoryLocationsResponse = useFetch('/api/categoryLocations');

  const { isLoading: nearLoading, data: nearLocations }: NearLocationsResponse =
    useFetch('/api/nearLocations');

  /**
   * TODO: Type Guard 관련
   * !nearLocations -> Error 페이지를 보여줘야 하는게 좋아보임
   * 임시로 !nearLocations 이면 Skeleton 을 보여주는 것으로 대체
   */

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ margin: '0 auto' }}>
          <Background />
          <Box sx={{ marginBottom: '5rem' }}>
            {nearLoading || !nearLocations ? (
              <SkeletonNearLocations />
            ) : (
              <NearLocations nearLocations={nearLocations} />
            )}
          </Box>
          <Box sx={{ marginBottom: '5rem' }}>
            {categoryLoading || !categoryLocations ? (
              <SkeletonNearLocations />
            ) : (
              <CategoryLocations categoryLocations={categoryLocations} />
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
