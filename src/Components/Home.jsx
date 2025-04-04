import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import food1 from './food1.jpg';
import food2 from './food2.jpg';
import food3 from './food3.jpg';
import food4 from './food4.jpg';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const images = [food1, food2, food3, food4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('username') && localStorage.getItem('email')) {
      navigate('/main_home');
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', height: '100vh' }}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }
            }}
          />
        ))}

        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: 0, 
          right: 0, 
          display: { xs: 'none', sm: 'flex' }, 
          justifyContent: 'space-between', 
          px: { xs: 1, sm: 2 }, 
          zIndex: 2,
          transform: 'translateY(-50%)'
        }}>
          <IconButton onClick={handlePrevImage} sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.3)' }}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleNextImage} sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.3)' }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <Box sx={{ 
          position: 'absolute', 
          bottom: { xs: '100px', sm: '70px' }, 
          left: 0, 
          right: 0, 
          display: 'flex', 
          justifyContent: 'center', 
          gap: { xs: 2, sm: 1 },
          zIndex: 2 
        }}>
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              sx={{
                width: { xs: 16, sm: 12 },
                height: { xs: 16, sm: 12 },
                borderRadius: '50%',
                bgcolor: index === currentImageIndex ? 'primary.main' : 'white',
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ 
          position: 'relative', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          textAlign: 'center',
          px: { xs: 2, sm: 3 }
        }}>
          <Typography 
            variant={isMobile ? "h4" : isTablet ? "h3" : "h2"} 
            component="h1" 
            color="white" 
            fontWeight="bold"
            sx={{ mb: { xs: 2, sm: 3 }, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            Welcome to Food Haven
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            color="white" 
            sx={{ mb: { xs: 4, sm: 6 }, maxWidth: '700px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
          >
            Discover delicious recipes, connect with food lovers, and explore the culinary world with our community
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button 
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
            >
              Sign In
            </Button>
            <Button 
              variant="outlined"
              onClick={() => navigate('/register')}
              sx={{ px: 4, py: 1.5, fontWeight: 'bold', color: 'white', borderColor: 'white' }}
            >
              Register
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box 
        sx={{ 
          position: 'absolute', 
          left: 0, 
          right: 0, 
          bottom: 0, 
          bgcolor: 'rgba(255,255,255,0.9)',
          py: 2,
          zIndex: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={4} sm={4}>
              <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <RestaurantIcon color="primary" sx={{ fontSize: 36 }} />
                  <Typography variant="h6" fontWeight="medium">
                    Discover Recipes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <LocalDiningIcon color="primary" sx={{ fontSize: 36 }} />
                  <Typography variant="h6" fontWeight="medium">
                    Share Your Dishes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <EmojiFoodBeverageIcon color="primary" sx={{ fontSize: 36 }} />
                  <Typography variant="h6" fontWeight="medium">
                    Join Food Lovers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;

