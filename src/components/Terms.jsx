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

const Terms = () => {
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
            Terms of Service
          </Typography>
        </Box>

        <ContentContainer>
          <Typography variant="h5" gutterBottom>
            1. Acceptance of Terms
          </Typography>
          <Typography paragraph color="text.secondary">
            By accessing and using VulneraScan, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </Typography>

          <Typography variant="h5" gutterBottom>
            2. Service Description
          </Typography>
          <Typography paragraph color="text.secondary">
            VulneraScan provides vulnerability scanning services for web applications. We do not guarantee the identification of all security vulnerabilities.
          </Typography>

          <Typography variant="h5" gutterBottom>
            3. User Responsibilities
          </Typography>
          <Typography paragraph color="text.secondary">
            You agree to use VulneraScan only on websites and applications for which you have proper authorization. Any unauthorized scanning is strictly prohibited.
          </Typography>

          <Typography variant="h5" gutterBottom>
            4. Limitation of Liability
          </Typography>
          <Typography paragraph color="text.secondary">
            VulneraScan is provided "as is" without any warranties. We are not liable for any damages arising from the use of our service.
          </Typography>

          <Typography variant="h5" gutterBottom>
            5. Service Modifications
          </Typography>
          <Typography paragraph color="text.secondary">
            We reserve the right to modify or discontinue VulneraScan at any time without notice. We are not liable to you or any third party for any modification or discontinuation.
          </Typography>

          <Typography variant="h5" gutterBottom>
            6. Governing Law
          </Typography>
          <Typography paragraph color="text.secondary">
            These terms are governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
          </Typography>
        </ContentContainer>
      </motion.div>
    </Container>
  );
};

export default Terms;