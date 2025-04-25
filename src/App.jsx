import { IconButton } from '@mui/material';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Hero from './components/Hero';
import Results from './components/Results';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import About from './components/About';
import Terms from './components/Terms';
import Privacy from './components/Privacy';

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

  @media (max-width: 768px) {
    padding: 1rem;
    position: relative;
  }
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

  @media (max-width: 768px) {
    font-size: 1.2rem;
    svg {
      font-size: 1.5rem;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.palette.background.paper};
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <AppContainer>
      <Navbar>
        <IconButton
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: theme => theme.palette.primary.main,
            marginRight: 1
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </IconButton>
        <Logo
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/')}
        >
          <FaShieldAlt />
          VulneraScan
        </Logo>
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/how-it-works">How It Works</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/results">Results</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/terms">Terms</NavLink>
          <NavLink to="/privacy">Privacy</NavLink>
        </NavLinks>
      </Navbar>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/results" element={<Results />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </AppContainer>
  );
}

export default App;