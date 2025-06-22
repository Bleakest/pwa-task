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
import type { LocationData } from "../types/types";

export default function LocationInfo() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  const fetchLocation = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/${id}`
      );

      if (!response.ok) {
        throw new Error(`Location not found! Status: ${response.status}`);
      }

      const data: LocationData = await response.json();
      setLocation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
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

  if (!location) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info" sx={{ my: 4 }}>
          <AlertTitle>Info</AlertTitle>
          No location found
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          {location.name}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <Chip label={location.type} color="primary" size="medium" />
          <Chip label={location.dimension} color="secondary" size="medium" />
        </Box>
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
              Type
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {location.type || "Unknown"}
            </Typography>
          </Grid>

          <Grid>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Dimension
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {location.dimension || "Unknown"}
            </Typography>
          </Grid>

          <Grid>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Residents
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {location.residents.length}
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
              {new Date(location.created).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      
    </Container>
  );
}
