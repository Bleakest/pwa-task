import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import { EpisodeCard } from '../components/EpisodeCard';
import { useInfiniteFetch } from '../hooks/useInfiniteFetch';
import { useInfiniteScroll } from '../hooks/useInfinitiScroll';
import type { EpisodeData } from '../types/types';

export default function Episodes() {
  const { data: episodes, isLoading, hasMore, fetchMore } = useInfiniteFetch<EpisodeData>();
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
        {episodes.map((episode) => (
          <Grid key={episode.id} >
            <EpisodeCard
              id={episode.id}
              airDate={episode.air_date}
              episode={episode.episode}
              name={episode.name}
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
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2, mb: 4 }}>
          No more episodes to load
        </Typography>
      )}
    </Box>
  );
}