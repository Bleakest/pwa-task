import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Container,
  Grid,
  Paper,
  AlertTitle,
} from "@mui/material";
import type { EpisodeData } from "../types/types";

export default function EpisodeInfo() {
  const [episode, setEpisode] = useState<EpisodeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  const fetchEpisode = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${id}`
      );

      if (!response.ok) {
        throw new Error(`Episode not found! Status: ${response.status}`);
      }

      const data: EpisodeData = await response.json();
      setEpisode(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisode();
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress color="secondary" size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 4 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!episode) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info" sx={{ my: 4 }}>
          <AlertTitle>Info</AlertTitle>
          No episode found
        </Alert>
      </Container>
    );
  }

  // Извлекаем номер сезона и серии
  const season = episode.episode.slice(1, 3);
  const epNum = episode.episode.slice(4);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Chip
          label={`Season ${season} • Episode ${epNum}`}
          color="primary"
          size="medium"
          sx={{ mb: 2, fontSize: "1rem", fontWeight: 600, px: 2, py: 1 }}
        />

        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          {episode.name}
        </Typography>

        <Typography variant="subtitle1" color="warning">
          Air Date: {episode.air_date}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid textAlign={'center'} container spacing={2}>
          <Grid>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Episode Code
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {episode.episode}
            </Typography>
          </Grid>

          <Grid>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Air Date
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {episode.air_date}
            </Typography>
          </Grid>

          <Grid>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Characters
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {episode.characters.length}
            </Typography>
          </Grid>

          <Grid>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Created
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {new Date(episode.created).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

     
    </Container>
  );
}
