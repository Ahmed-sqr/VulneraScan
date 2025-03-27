import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Hero from './components/Hero';
import Results from './components/Results';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import About from './components/About';
import Auth from './components/Auth';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.palette.background.default};
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${props => props.theme.palette.background.paper};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.palette.primary.main};
  cursor: pointer;

  svg {
    font-size: 2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.palette.primary.main};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.palette.secondary.main};
  }
`;

function App() {
  const navigate = useNavigate();
  return (
    <AppContainer>
      <Navbar>
        <Logo
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/')}
        >
          <FaShieldAlt />
          VulneraScan
        </Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/how-it-works">How It Works</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/results">Results</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Button
            variant="contained"
            onClick={() => navigate('/auth')}
            sx={{
              background: theme => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: '#000',
              fontWeight: 'bold',
              '&:hover': {
                background: theme => `linear-gradient(135deg, ${theme.palette.primary.main} 20%, ${theme.palette.secondary.main} 120%)`
              }
            }}
          >
            Login
          </Button>
        </NavLinks>
      </Navbar>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/results" element={<Results />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </AppContainer>
  );
}

export default App;