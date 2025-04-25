import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import styled from '@emotion/styled';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const StyledPaper = styled(Paper)`
  padding: 2.5rem;
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.6) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.palette.text.secondary};
  
  svg {
    font-size: 1.5rem;
    color: ${props => props.theme.palette.primary.main};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  
  a {
    color: ${props => props.theme.palette.text.secondary};
    font-size: 1.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.palette.primary.main};
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }
          }}>
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Get in Touch
              </Typography>
              <ContactInfo>
                <FaEnvelope />
                <div>
                  <Typography variant="subtitle1">Email</Typography>
                  <Typography variant="body2">contact@vulnerascan.com</Typography>
                </div>
              </ContactInfo>
              <ContactInfo>
                <FaPhone />
                <div>
                  <Typography variant="subtitle1">Phone</Typography>
                  <Typography variant="body2">+1 (555) 123-4567</Typography>
                </div>
              </ContactInfo>
              <ContactInfo>
                <FaMapMarkerAlt />
                <div>
                  <Typography variant="subtitle1">Address</Typography>
                  <Typography variant="body2">123 Security Street, Cyber City, 12345</Typography>
                </div>
              </ContactInfo>
              <SocialLinks>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              </SocialLinks>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={7}>
            <StyledPaper elevation={3}>
              <StyledForm onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    background: theme => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    color: '#000',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: theme => `linear-gradient(135deg, ${theme.palette.primary.main} 20%, ${theme.palette.secondary.main} 120%)`
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Send Message'}
                </Button>
              </StyledForm>
            </StyledPaper>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          <Alert
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
};

export default Contact;