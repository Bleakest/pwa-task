import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Chip,
  Avatar,
  Container,
  Divider,
  AlertTitle,
} from "@mui/material";
import type { HeroData } from "../types/types";

export default function HeroInfo() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  const fetchHero = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: HeroData = await response.json();
      setHero(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
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

  if (!hero) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info" sx={{ my: 4 }}>
          <AlertTitle>Info</AlertTitle>
          No hero found
        </Alert>
      </Container>
    );
  }

  // Цвет для статуса
  const statusColor =
    hero.status === "Alive"
      ? "success"
      : hero.status === "Dead"
      ? "error"
      : "warning";

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Avatar
              src={hero.image}
              alt={hero.name}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 0,
              }}
              variant="square"
            />
          </Paper>
        </Grid>

        <Grid>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              {hero.name}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              <Chip
                label={hero.status}
                color={statusColor}
                size="medium"
                variant="outlined"
              />
              <Chip label={hero.species} color="primary" size="medium" />
              <Chip label={hero.gender} color="secondary" size="medium" />
              {hero.type && (
                <Chip label={hero.type} color="info" size="medium" />
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Origin
              </Typography>
              <Typography variant="body1" color="primary">
                {hero.origin.name === "unknown" ? "Unknown" : hero.origin.name}
              </Typography>
            </Grid>

            <Grid>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Current Location
              </Typography>
              <Typography variant="body1" color="primary">
                {hero.location.name}
              </Typography>
            </Grid>

            <Grid>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Appears in
              </Typography>
              <Typography variant="body1" color="primary">
                {hero.episode.length} episodes
              </Typography>
            </Grid>

            <Grid>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                First Appearance
              </Typography>
              <Typography variant="body1" color="primary">
                Episode {hero.episode[0]?.split("/").pop()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
