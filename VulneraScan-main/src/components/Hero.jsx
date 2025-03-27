import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Button, TextField } from '@mui/material';
import { FaShieldAlt, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => `linear-gradient(135deg, ${props.theme.palette.primary.main}1A 0%, ${props.theme.palette.secondary.main}1A 100%)`};
    z-index: 0;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  z-index: 1;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  background: ${props => `linear-gradient(135deg, ${props.theme.palette.primary.main} 0%, ${props.theme.palette.secondary.main} 100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #ffffff;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StyledButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  text-transform: none;
  background: ${props => `linear-gradient(135deg, ${props.theme.palette.primary.main} 0%, ${props.theme.palette.secondary.main} 100%)`};
  color: #000;
  font-weight: bold;

  &:hover {
    background: ${props => `linear-gradient(135deg, ${props.theme.palette.primary.main} 20%, ${props.theme.palette.secondary.main} 120%)`};
  }
`;

const IconContainer = styled(motion.div)`
  position: absolute;
  font-size: 10rem;
  color: rgba(255, 255, 255, 0.03);
  z-index: 0;
`;

const Hero = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError('');
  };

  const handleScan = () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    // URL validation
    try {
      let urlToValidate = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        urlToValidate = 'https://' + url;
      }
      new URL(urlToValidate);
      // Navigate to results page after starting the scan
      navigate('/results');
    } catch {
      setError('Please enter a valid URL (e.g., www.example.com or https://example.com)');
    }
  };

  return (
    <HeroContainer>
      <IconContainer
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ top: '10%', left: '10%' }}
      >
        <FaShieldAlt />
      </IconContainer>
      <IconContainer
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ bottom: '10%', right: '10%' }}
      >
        <FaSearch />
      </IconContainer>
      <Content>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Secure Your Digital Assets with VulneraScan
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Advanced vulnerability scanning for modern web applications
        </Subtitle>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter website URL to scan"
          value={url}
          onChange={handleUrlChange}
          error={!!error}
          helperText={error}
          sx={{
            maxWidth: '600px',
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              }
            }
          }}
        />
        <StyledButton
          variant="contained"
          onClick={handleScan}
        >
          Start Scanning
        </StyledButton>
        </motion.div>
      </Content>
    </HeroContainer>
  );
};

export default Hero;