import { Card, CardContent, Typography, CardActionArea, useTheme, Chip } from "@mui/material";
import { Link } from 'react-router-dom';

export function LocationCard({ id, name, type, dimension }: any) {
  const theme = useTheme();
  
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
        to={`/location/${id}`} 
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
          <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 700 }}>
            {name}
          </Typography>
          
          <Chip 
            label={`ID: ${id}`} 
            size="small" 
            color="info" 
            sx={{ mb: 1, fontWeight: 600 }} 
          />
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Type:</strong> {type || 'Unknown'}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Dimension:</strong> {dimension || 'Unknown'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}