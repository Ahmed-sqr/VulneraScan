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
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.6) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
`;

const getSeverityColor = (severity) => ({
  High: '#ff4444',
  Medium: '#ffbb33',
  Low: '#00C851',
}[severity] || '#33b5e5');

const VulnerabilityChip = ({ status }) => {
  const config = {
    vulnerable: { color: '#ff4444', label: 'Vulnerable' },
    clean: { color: '#00C851', label: 'Secure' },
  }[status] || { color: '#00C851', label: 'Secure' };

  return (
    <Chip
      label={config.label}
      sx={{
        backgroundColor: config.color,
        color: '#fff',
        fontSize: '0.85rem',
        fontWeight: 'bold',
      }}
    />
  );
};

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`scan-tabpanel-${index}`}
    aria-labelledby={`scan-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({
    sql: null,
    xss: null,
    cmd: null,
    tech: null,
  });
  const [tabValue, setTabValue] = useState(0);
  const { state } = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      if (!state?.url) {
        setError('No URL provided. Please go back and enter a URL.');
        setLoading(false);
        return;
      }

      const urlToScan = state.url;
      try {
        setLoading(true);

        const endpoints = {
          sql: 'http://127.0.0.1:5000/api/scan',
          xss: 'http://127.0.0.1:5000/api/scan',
          cmd: 'http://127.0.0.1:5000/api/scan',
          tech: 'https://api.builtwith.com/v20/api.json',
        };

        const [sqlResponse, xssResponse, cmdResponse, techResponse] = await Promise.all([
          fetch(endpoints.sql, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlToScan, test: 'sql' }),
          }),
          fetch(endpoints.xss, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlToScan, test: 'xss' }),
          }),
          fetch(endpoints.cmd, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlToScan, test: 'cmd' }),
          }),
          fetch(`${endpoints.tech}?KEY=6e1308ca-4f44-4371-86c1-99ad2379bb04&LOOKUP=${urlToScan}`),
        ]);

        if (!sqlResponse.ok || !xssResponse.ok || !cmdResponse.ok || !techResponse.ok) {
          throw new Error('One or more API requests failed');
        }

        const [sqlData, xssData, cmdData, techData] = await Promise.all([
          sqlResponse.json(),
          xssResponse.json(),
          cmdResponse.json(),
          techResponse.json(),
        ]);

        setResults({
          url: urlToScan,
          scanDate: new Date().toLocaleString(),
          sql: sqlData.sql || {},
          xss: xssData.xss || {},
          cmd: cmdData.cmd || {},
          tech: techData || {},
        });

        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch scan results. Please try again.');
        setLoading(false);
      }
    };

    fetchResults();
  }, [state]);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

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
            Running security scans...
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
            Security Scan Results
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Target URL: {results.url}
          </Typography>
          <Typography color="text.secondary">
            Scan completed: {results.scanDate}
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="scan results tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="SQL Injection" />
            <Tab label="XSS Vulnerability" />
            <Tab label="Command Injection" />
            <Tab label="Technology Detection" />
            <Tab label="Summary" />
          </Tabs>
        </Box>

        {/* SQL Injection Results */}
        <TabPanel value={tabValue} index={0}>
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">SQL Injection Test Results</Typography>
              {results.sql?.status && <VulnerabilityChip status={results.sql.status} />}
            </Box>
            
            {results.sql && (
              <>
                <StyledPaper elevation={3} sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>System Information</Typography>
                  <Grid container spacing={3}>
                    {[
                      { label: 'DBMS Version', value: results.sql.dbms },
                      { label: 'Operating System', value: results.sql.os },
                      { label: 'Technology Stack', value: results.sql.technology },
                      { label: 'Web Server', value: results.sql.web_server },
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Typography variant="subtitle2" color="text.secondary">{item.label}</Typography>
                        <Typography>{item.value || 'N/A'}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </StyledPaper>

                {results.sql.vulnerabilities?.length > 0 ? (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Detected Vulnerabilities</Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Vulnerability</TableCell>
                            <TableCell>Details</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {results.sql.vulnerabilities.map((vulnerability, index) => (
                            <TableRow key={index}>
                              <TableCell>Vulnerability {index + 1}</TableCell>
                              <TableCell>{vulnerability}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ) : (
                  <Typography>No SQL injection vulnerabilities found</Typography>
                )}
              </>
            )}
          </StyledPaper>
        </TabPanel>

        {/* XSS Vulnerability Results */}
        <TabPanel value={tabValue} index={1}>
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">XSS Vulnerability Test Results</Typography>
              {results.xss?.status && <VulnerabilityChip status={results.xss.status} />}
            </Box>
            
            {results.xss && (
              <>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>Vulnerability Details</Typography>
                  <Typography>{results.xss.details || 'No details available'}</Typography>
                </Box>

                {results.xss.payload_used && (
                  <StyledPaper elevation={3} sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Payload Used</Typography>
                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                      <Typography sx={{ fontFamily: 'monospace' }}>{results.xss.payload_used}</Typography>
                    </Box>
                  </StyledPaper>
                )}

                <Grid container spacing={3} sx={{ mb: 3 }}>
                  {[
                    { label: 'Vulnerable Parameter', value: results.xss.vulnerable_parameter },
                    { label: 'Vulnerable Page', value: results.xss.vulnerable_page },
                    { label: 'Tool Version', value: results.xss.tool_version },
                    { label: 'Scan Progress', value: results.xss.progress },
                  ].map((item, index) => (
                    item.value && (
                      <Grid item xs={12} sm={6} key={index}>
                        <Typography variant="subtitle2" color="text.secondary">{item.label}</Typography>
                        <Typography>{item.value}</Typography>
                      </Grid>
                    )
                  ))}
                </Grid>
              </>
            )}
          </StyledPaper>
        </TabPanel>

        {/* Command Injection Results */}
        <TabPanel value={tabValue} index={2}>
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Command Injection Test Results</Typography>
              {results.cmd?.status && <VulnerabilityChip status={results.cmd.status} />}
            </Box>

            {results.cmd && (
              <>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>Details</Typography>
                  <Typography>{results.cmd.details || 'No details available'}</Typography>
                </Box>

                {results.cmd.payload && (
                  <StyledPaper elevation={3} sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Payload Used</Typography>
                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                      <Typography sx={{ fontFamily: 'monospace' }}>{results.cmd.payload}</Typography>
                    </Box>
                  </StyledPaper>
                )}

                <Grid container spacing={3}>
                  {[
                    { label: 'Vulnerable Parameter', value: results.cmd.vulnerable_parameter },
                    { label: 'Vulnerable Page', value: results.cmd.vulnerable_page },
                    { label: 'Tool Version', value: results.cmd.tool_version },
                    { label: 'Scan Progress', value: results.cmd.progress },
                  ].map((item, index) => (
                    item.value && (
                      <Grid item xs={12} sm={6} key={index}>
                        <Typography variant="subtitle2" color="text.secondary">{item.label}</Typography>
                        <Typography>{item.value}</Typography>
                      </Grid>
                    )
                  ))}
                </Grid>
              </>
            )}
          </StyledPaper>
        </TabPanel>


        {/* Technology Detection Results */}
        <TabPanel value={tabValue} index={3}>
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Technology Stack Analysis</Typography>
            </Box>

            {results.tech && (
              <Grid container spacing={3}>
                {Object.entries(results.tech).map(([category, items], index) => (
                  items && items.length > 0 && (
                    <Grid item xs={12} key={index}>
                      <StyledPaper elevation={3} sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {items.map((item, i) => (
                            <Chip
                              key={i}
                              label={item}
                              sx={{
                                bgcolor: 'background.paper',
                                '&:hover': { bgcolor: 'action.hover' }
                              }}
                            />
                          ))}
                        </Box>
                      </StyledPaper>
                    </Grid>
                  )
                ))}
              </Grid>
            )}
          </StyledPaper>
        </TabPanel>

        {/* Summary Tab */}
        <TabPanel value={tabValue} index={4}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>Scan Summary</Typography>

            <Grid container spacing={3}>
              {[
                { label: 'SQL Injection', status: results.sql?.status },
                { label: 'XSS Vulnerability', status: results.xss?.status },
                { label: 'Command Injection', status: results.cmd?.status }
              ].map((test, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <StyledPaper elevation={3}>
                    <Typography variant="h6" gutterBottom>{test.label}</Typography>
                    {test.status && <VulnerabilityChip status={test.status} />}
                  </StyledPaper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>Overall Security Status</Typography>
              <Typography color="text.secondary">
                {Object.values(results).some(result => result?.status === 'vulnerable')
                  ? 'Vulnerabilities detected. Please review the detailed reports for each test.'
                  : 'No critical vulnerabilities detected. Continue monitoring and maintaining security best practices.'}
              </Typography>
            </Box>
          </StyledPaper>
        </TabPanel>
      </motion.div>
    </Container>
  );
};

export default Results;