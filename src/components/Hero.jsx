import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FaShieldAlt, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.palette.background.default};

  @media (min-width: 600px) {
    padding: 4rem 2rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      ${props => `${props.theme.palette.primary.main}30`} 0%,
      transparent 70%
    );
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      ${props => `${props.theme.palette.primary.main}10`} 0%,
      ${props => `${props.theme.palette.secondary.main}10`} 50%,
      transparent 100%
    );
    animation: gradient 15s ease infinite;
    z-index: 0;
  }

  @keyframes gradient {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  z-index: 1;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: ${props => `linear-gradient(135deg, ${props.theme.palette.primary.main} 0%, ${props.theme.palette.secondary.main} 100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.75rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.75rem;
  margin-bottom: 2.5rem;
  color: ${props => props.theme.palette.text.secondary};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 0 1rem;
  }
`;

const StyledButton = styled(Button)`
  font-size: 1.2rem;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-transform: none;
  background: ${props => `linear-gradient(135deg, ${props.theme.palette.primary.main} 0%, ${props.theme.palette.secondary.main} 100%)`};
  color: ${props => props.theme.palette.background.default};
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px ${props => `${props.theme.palette.primary.main}50`};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => `linear-gradient(135deg, ${props.theme.palette.primary.main} 20%, ${props.theme.palette.secondary.main} 120%)`};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${props => `${props.theme.palette.primary.main}80`};
  }
`;

const IconContainer = styled(motion.div)`
  position: absolute;
  font-size: 12rem;
  color: ${props => `${props.theme.palette.primary.main}15`};
  z-index: 0;
  filter: blur(1px);
  transition: all 0.5s ease;

  &:hover {
    color: ${props => `${props.theme.palette.primary.main}25`};
    filter: blur(0);
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    &.Mui-focused {
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 0 2px ${props => props.theme.palette.primary.main}40;
    }

    fieldset {
      border-color: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
    }
  }

  .MuiOutlinedInput-input {
    padding: 16px;
    color: ${props => props.theme.palette.text.primary};
    font-size: 1.1rem;

    &::placeholder {
      color: ${props => props.theme.palette.text.secondary};
      opacity: 0.7;
    }
  }

  .MuiFormHelperText-root {
    margin-top: 8px;
    font-size: 0.9rem;
    color: ${props => props.theme.palette.error.main};
    background: ${props => props.theme.palette.error.main}10;
    padding: 4px 12px;
    border-radius: 6px;
    backdrop-filter: blur(5px);
  }
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
    navigate('/results', { state: { url } });
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
          <StyledTextField
            fullWidth
            variant="outlined"
            placeholder="Enter URL to scan"
            value={url}
            onChange={handleUrlChange}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />
          <StyledButton
            variant="contained"
            onClick={handleScan}
            startIcon={<FaSearch />}
          >
            Start Scan
          </StyledButton>
        </motion.div>
      </Content>
    </HeroContainer>
  );
};

export default Hero;