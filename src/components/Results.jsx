import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.6) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
`;

const getSeverityColor = (severity) => {
  const colors = {
    High: '#ff4444',
    Medium: '#ffbb33',
    Low: '#00C851',
  };
  return colors[severity] || '#33b5e5';
};

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const { state } = useLocation();

  useEffect(() => {
    const fetchResults = async () => {        
      if (!state?.url) {
          setError("No URL provided. Please go back and enter a URL.");
          setLoading(false);
          return;
        }
        const urlToScan = state.url;
      try {
        setLoading(true);
        const endpoint = 'http://127.0.0.1:5000/api/scan';

        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: urlToScan })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults({
          url: urlToScan,
          scanDate: new Date().toLocaleString(),
          dbms: data.dbms,
          os: data.os,
          technology: data.technology,
          status: data.status,
          vulnerabilities: data.vulnerabilities || [],
          errors: data.errors || [],
          web_server: data.web_server
        });
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch scan results. Please try again.');
        setLoading(false);
      }
    };

    fetchResults();
  }, [state]);

  if (loading) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="text.secondary">
            Analyzing scan results...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" gutterBottom>
            Scan Results
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Target URL: {results.url}
          </Typography>
          <Typography color="text.secondary">
            Scan completed: {results.scanDate}
          </Typography>
        </Box>

        <StyledPaper elevation={3} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>System Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">DBMS Version</Typography>
              <Typography>{results.dbms || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Operating System</Typography>
              <Typography>{results.os || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Technology Stack</Typography>
              <Typography>{results.technology || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Web Server</Typography>
              <Typography>{results.web_server || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </StyledPaper>

        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>Vulnerability Status: {results.status}</Typography>
          {results.vulnerabilities && results.vulnerabilities.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vulnerability</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.vulnerabilities.map((vulnerability, index) => (
                    <TableRow key={index}>
                      <TableCell>Vulnerability {index + 1}</TableCell>
                      <TableCell>{vulnerability}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No vulnerabilities found</Typography>
          )}

          {results.errors && results.errors.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom color="error">Errors</Typography>
              {results.errors.map((error, index) => (
                <Typography key={index} color="error">{error}</Typography>
              ))}
            </Box>
          )}
        </StyledPaper>
      </motion.div>
    </Container>
  );
};

export default Results;