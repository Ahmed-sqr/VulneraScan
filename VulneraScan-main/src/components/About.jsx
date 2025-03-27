import { motion } from 'framer-motion';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { FaLock, FaCode, FaUserShield } from 'react-icons/fa';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)`
  padding: 2.5rem;
  height: 100%;
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.6) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.palette.primary.main};
`;

const features = [
  {
    icon: <FaLock />,
    title: 'Advanced Security',
    description: 'State-of-the-art vulnerability scanning technology to protect your applications from emerging threats.'
  },
  {
    icon: <FaCode />,
    title: 'Code Analysis',
    description: 'Deep code inspection and analysis to identify potential security flaws and vulnerabilities in your codebase.'
  },
  {
    icon: <FaUserShield />,
    title: 'Expert Protection',
    description: 'Built by security experts with years of experience in identifying and preventing cyber threats.'
  }
];

const About = () => {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            About VulneraScan
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
            Empowering developers with advanced security tools to build safer applications
          </Typography>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            VulneraScan is a cutting-edge security scanning platform designed to help developers identify and fix vulnerabilities in their applications. Our mission is to make application security accessible and manageable for development teams of all sizes.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StyledPaper elevation={3}>
                  <IconWrapper>
                    {feature.icon}
                  </IconWrapper>
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </StyledPaper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h4" gutterBottom>
            Our Commitment
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            We are committed to providing the most comprehensive and reliable security scanning solution, helping organizations maintain the highest standards of application security in an ever-evolving threat landscape.
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About;