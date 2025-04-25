import { motion } from 'framer-motion';
import { Container, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';

const ContentContainer = styled(Box)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.6) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Privacy = () => {
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
            Privacy Policy
          </Typography>
        </Box>

        <ContentContainer>
          <Typography variant="h5" gutterBottom>
            1. Information We Collect
          </Typography>
          <Typography paragraph color="text.secondary">
            We collect information you provide directly to us, including URLs submitted for scanning. We also collect usage data to improve our service.
          </Typography>

          <Typography variant="h5" gutterBottom>
            2. How We Use Your Information
          </Typography>
          <Typography paragraph color="text.secondary">
            We use the information to provide and improve our vulnerability scanning services, analyze usage patterns, and enhance security features.
          </Typography>

          <Typography variant="h5" gutterBottom>
            3. Data Security
          </Typography>
          <Typography paragraph color="text.secondary">
            We implement appropriate security measures to protect your information from unauthorized access, alteration, or disclosure.
          </Typography>

          <Typography variant="h5" gutterBottom>
            4. Data Retention
          </Typography>
          <Typography paragraph color="text.secondary">
            We retain scan results and associated data for a reasonable period to provide our services and comply with legal obligations.
          </Typography>

          <Typography variant="h5" gutterBottom>
            5. Third-Party Services
          </Typography>
          <Typography paragraph color="text.secondary">
            We may use third-party services to support our operations. These services are bound by confidentiality agreements.
          </Typography>

          <Typography variant="h5" gutterBottom>
            6. Your Rights
          </Typography>
          <Typography paragraph color="text.secondary">
            You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
          </Typography>

          <Typography variant="h5" gutterBottom>
            7. Updates to Privacy Policy
          </Typography>
          <Typography paragraph color="text.secondary">
            We may update this policy periodically. We will notify you of any material changes by posting the new policy on this page.
          </Typography>
        </ContentContainer>
      </motion.div>
    </Container>
  );
};

export default Privacy;