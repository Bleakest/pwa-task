import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import { LocationCard } from '../components/LocationCard';
import { useInfiniteFetch } from '../hooks/useInfiniteFetch';
import { useInfiniteScroll } from '../hooks/useInfinitiScroll';
import type { LocationData } from '../types/types';

export default function Locations() {
  const { data: locations, isLoading, hasMore, fetchMore } = useInfiniteFetch<LocationData>();
  useInfiniteScroll(fetchMore);

  return (
    <Box sx={{ 
      py: 4,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Grid 
        container 
        spacing={3} 
        justifyContent="center"
        sx={{ maxWidth: '95%', margin: '0 auto' }}
      >
        {locations.map((location) => (
          <Grid key={location.id} >
            <LocationCard
              id={location.id}
              name={location.name}
              type={location.type}
              dimension={location.dimension}
            />
          </Grid>
        ))}
      </Grid>
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      
      {!hasMore && !isLoading && (
        <Typography variant="body1" color="secondary" sx={{ mt: 2, mb: 4 }}>
          No more locations to load
        </Typography>
      )}
    </Box>
  );
}