import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  CardActionArea,
  useTheme,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

export function HeroCard({ name, id, species, status, gender, image }: any) {
  const theme = useTheme();

  const statusColors: Record<string, string> = {
    Alive: theme.palette.success.main,
    Dead: theme.palette.error.main,
    unknown: theme.palette.grey[500],
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/character/${id}`}
        sx={{ flexGrow: 1 }}
      >
        <CardMedia component="img" height="200" image={image} alt={name} />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight={700}
          >
            {name}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
            <Chip
              label={status}
              size="small"
              sx={{
                backgroundColor:
                  statusColors[status] || theme.palette.grey[500],
                color: theme.palette.common.white,
              }}
            />
            <Chip label={species} size="small" color="primary" />
            <Chip label={gender} size="small" color="secondary" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
