import { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Have questions? We'd love to hear from you.
          </Typography>
        </Box>

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
            sx={{
              background: theme => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: '#000',
              fontWeight: 'bold',
              '&:hover': {
                background: theme => `linear-gradient(135deg, ${theme.palette.primary.main} 20%, ${theme.palette.secondary.main} 120%)`
              }
            }}
          >
            Send Message
          </Button>
        </StyledForm>
      </motion.div>
    </Container>
  );
};

export default Contact;