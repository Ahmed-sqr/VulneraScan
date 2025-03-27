import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const ResultsContainer = styled.div`
  min-height: 80vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.palette.background.default};
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 2rem;
  background: ${props => `linear-gradient(135deg, ${props.theme.palette.primary.main} 0%, ${props.theme.palette.secondary.main} 100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  max-width: 1200px;
  width: 100%;
  margin-top: 2rem;
  background: ${props => props.theme.palette.background.paper};
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const StyledTableCell = styled(TableCell)`
  color: ${props => props.theme.palette.primary.main};
  font-weight: ${props => props.header ? 'bold' : 'normal'};
  font-size: 1rem;
`;

const Results = () => {
  // Mock data for demonstration
  const scanResults = [
    { id: 1, vulnerability: 'SQL Injection', severity: 'High', location: '/api/users', description: 'Potential SQL injection vulnerability in user input' },
    { id: 2, vulnerability: 'XSS', severity: 'Medium', location: '/search', description: 'Cross-site scripting vulnerability in search form' },
    { id: 3, vulnerability: 'CSRF', severity: 'Low', location: '/settings', description: 'Missing CSRF token in form submission' },
  ];

  return (
    <ResultsContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Scan Results
      </Title>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ width: '100%' }}
      >
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell header>Vulnerability</StyledTableCell>
                <StyledTableCell header>Severity</StyledTableCell>
                <StyledTableCell header>Location</StyledTableCell>
                <StyledTableCell header>Description</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scanResults.map((result) => (
                <TableRow key={result.id}>
                  <StyledTableCell>{result.vulnerability}</StyledTableCell>
                  <StyledTableCell>{result.severity}</StyledTableCell>
                  <StyledTableCell>{result.location}</StyledTableCell>
                  <StyledTableCell>{result.description}</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </motion.div>
    </ResultsContainer>
  );
};

export default Results;