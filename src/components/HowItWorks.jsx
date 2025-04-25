import { motion } from 'framer-motion';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { FaSearch, FaShieldAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  height: 100%;
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.6) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.palette.primary.main};

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const steps = [
  {
    icon: <FaSearch />,
    title: 'Scan Initiation',
    description: 'Upload your code or provide repository access for comprehensive vulnerability analysis.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Deep Analysis',
    description: 'Our advanced algorithms scan for known vulnerabilities, security flaws, and potential threats.'
  },
  {
    icon: <FaExclamationTriangle />,
    title: 'Vulnerability Detection',
    description: 'Identify security risks and vulnerabilities with detailed explanations and severity levels.'
  },
  {
    icon: <FaCheckCircle />,
    title: 'Remediation Guidance',
    description: 'Receive actionable recommendations and best practices to fix identified vulnerabilities.'
  }
];

const HowItWorks = () => {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }
          }}>
            How It Works
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ 
            mb: { xs: 4, md: 6 },
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            px: 2
          }}>
            Discover how VulneraScan protects your applications through our advanced security scanning process
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StyledPaper elevation={3}>
                  <IconWrapper>
                    {step.icon}
                  </IconWrapper>
                  <Typography variant="h5" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </StyledPaper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h4" gutterBottom sx={{
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
          }}>
            Start Securing Your Application Today
          </Typography>
          <Typography color="text.secondary" sx={{ 
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '0.9rem', sm: '1rem' },
            px: 2
          }}>
            Join thousands of developers who trust VulneraScan to keep their applications secure
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default HowItWorks;