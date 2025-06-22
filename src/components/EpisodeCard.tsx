import { Card, CardContent, Typography, CardActionArea, useTheme, Chip } from "@mui/material";
import { Link } from 'react-router-dom';

export function EpisodeCard({ id, name, episode, airDate }: any) {
  const theme = useTheme();
  
  const season = episode.slice(1, 3);
  const epNum = episode.slice(4);
  
  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      width: '300px',
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[8]
      }
    }}>
      <CardActionArea 
        component={Link} 
        to={`/episode/${id}`} 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          p: 2
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Chip 
            label={`S${season} E${epNum}`} 
            size="small" 
            color="primary" 
            sx={{ mb: 1, fontWeight: 600 }} 
          />
          
          <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 700 }}>
            {name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Air Date:</strong> {airDate}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Episode:</strong> {episode}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}