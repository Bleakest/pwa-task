import { Grid, Box, CircularProgress } from "@mui/material";
import { HeroCard } from '../components/HeroCard';
import { useInfiniteFetch } from '../hooks/useInfiniteFetch';
import { useInfiniteScroll } from '../hooks/useInfinitiScroll';

export default function Characters() {
  const { data: characters, isLoading, fetchMore } = useInfiniteFetch<any>();
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
      >
        {characters.map((character) => (
          <Grid key={character.id} >
            <HeroCard
              id={character.id}
              gender={character.gender}
              image={character.image}
              species={character.species}
              status={character.status}
              name={character.name}
            />
          </Grid>
        ))}
      </Grid>
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
}