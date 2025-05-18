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
  Grid,
  Tabs,
  Tab,
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
  const [errors, setErrors] = useState({
    sql: null,
    xss: null,
    cmd: null,
    tech: null,
    general: null
  });
  const [results, setResults] = useState({
    url: '',
    scanDate: '',
    sql: null,
    xss: null,
    cmd: null,
    tech: null,
  });
  const [tabValue, setTabValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      const urlToScan = location?.state?.url;
      
      if (!urlToScan) {
        console.error('No URL provided');
        setErrors({ ...errors, general: 'No URL provided. Please go back and enter a URL.' });
        setLoading(false);
        return;
      }

      console.log('Starting scan for URL:', urlToScan);
      setResults(prev => ({ ...prev, url: urlToScan, scanDate: new Date().toLocaleString() }));
      
      try {
        setLoading(true);

        const endpoints = {
          sql: 'http://127.0.0.1:5000/api/scan',
          xss: 'http://127.0.0.1:5000/api/scan',
          cmd: 'http://127.0.0.1:5000/api/scan',
          tech: 'https://api.builtwith.com/v20/api.json',
        };

        const handleFetchResponse = async (response, testType) => {
          if (!response.ok) {
            throw new Error(`${testType} scan failed with status: ${response.status}`);
          }
          const data = await response.json();
          console.log(`${testType} scan result:`, data);
          return data;
        };

        try {
          console.log('Starting SQL injection scan for URL:', urlToScan);
          const sqlResponse = await fetch(endpoints.sql, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlToScan, test: 'sql' }),
          });
          
          const sqlData = await handleFetchResponse(sqlResponse, 'SQL');
          console.log('Raw SQL scan result:', sqlData);
          
          setResults(prev => ({ 
            ...prev, 
            sql: sqlData?.sql || sqlData || {} 
          }));
        } catch (err) {
          console.error('SQL scan error:', err);
          setErrors(prev => ({ ...prev, sql: err.toString() }));
        }

        try {
          console.log('Starting XSS scan for URL:', urlToScan);
          const xssResponse = await fetch(endpoints.xss, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlToScan, test: 'xss' }),
          });
          
          const xssData = await handleFetchResponse(xssResponse, 'XSS');
          console.log('Raw XSS scan result:', xssData);
          
          // Check if response is structured as expected
          setResults(prev => ({ 
            ...prev, 
            xss: xssData?.xss || xssData || {} 
          }));
        } catch (err) {
          console.error('XSS scan error:', err);
          setErrors(prev => ({ ...prev, xss: err.toString() }));
        }

        // Command injection scan
        try {
          console.log('Starting Command injection scan for URL:', urlToScan);
          const cmdResponse = await fetch(endpoints.cmd, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlToScan, test: 'cmd' }),
          });
          
          const cmdData = await handleFetchResponse(cmdResponse, 'CMD');
          console.log('Raw Command injection data:', cmdData);
          
          // Check if response is structured as expected
          setResults(prev => ({ 
            ...prev, 
            cmd: cmdData?.cmd || cmdData || {} 
          }));
        } catch (err) {
          console.error('Command injection scan error:', err);
          setErrors(prev => ({ ...prev, cmd: err.toString() }));
        }
        

          try {
            const techResponse = await fetch(`${endpoints.tech}?KEY=eee0cf86-0d0f-4bb0-afef-373a944b5a50&LOOKUP=${urlToScan}`);
          const techData = await handleFetchResponse(techResponse, 'Technology');
          console.log('Raw tech data:', techData);
          
          let processedTechData = {};
          
          if (techData && techData.Results && techData.Results.length > 0) {
            const result = techData.Results[0];
            
            if (result.Result && result.Result.Paths && result.Result.Paths.length > 0) {
              const pathData = result.Result.Paths[0];
              
              if (pathData.Technologies && pathData.Technologies.length > 0) {
                // Group technologies by tag
                pathData.Technologies.forEach(tech => {
                  const tag = tech.Tag || 'other';
                  if (!processedTechData[tag]) {
                    processedTechData[tag] = [];
                  }
                  processedTechData[tag].push(tech.Name);
                });
                
                console.log('Processed tech data:', processedTechData);
              }
            }
          }
          
          setResults(prev => ({ 
            ...prev, 
            tech: processedTechData 
          }));
        } catch (err) {
          console.error('Technology detection error:', err);
          setErrors(prev => ({ ...prev, tech: err.toString() }));
        }

        console.log('All scans completed');
      } catch (err) {
        console.error('Overall scan error:', err);
        setErrors(prev => ({ 
          ...prev, 
          general: 'An unexpected error occurred. Some results may be incomplete.' 
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []); // Only run once on component mount

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // Check if we have any results to display
  const hasAnyResults = Boolean(
    results.sql || results.xss || results.cmd || results.tech
  );

  // Debug output
  console.log('Current results state:', results);
  console.log('Current errors state:', errors);

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

  if (errors.general && !hasAnyResults) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {errors.general}
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

        {errors.general && (
          <Alert severity="warning" sx={{ mb: 4 }}>
            {errors.general}
          </Alert>
        )}

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
            
            {errors.sql ? (
              <Alert severity="error" sx={{ mb: 3 }}>
                Failed to get SQL injection results: {errors.sql}
              </Alert>
            ) : results.sql ? (
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
                ) : results.sql.vulnerabilities === undefined ? (
                  <Typography>Scan did not return vulnerability data</Typography>
                ) : (
                  <Typography>No SQL injection vulnerabilities found</Typography>
                )}
              </>
            ) : (
              <Typography>No SQL injection data available</Typography>
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
            
            {errors.xss ? (
              <Alert severity="error" sx={{ mb: 3 }}>
                Failed to get XSS vulnerability results: {errors.xss}
              </Alert>
            ) : results.xss ? (
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
            ) : (
              <Typography>No XSS vulnerability data available</Typography>
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

            {errors.cmd ? (
              <Alert severity="error" sx={{ mb: 3 }}>
                Failed to get command injection results: {errors.cmd}
              </Alert>
            ) : results.cmd ? (
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
            ) : (
              <Typography>No command injection data available</Typography>
            )}
          </StyledPaper>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Technology Stack Analysis</Typography>
            </Box>

            {errors.tech ? (
              <Alert severity="error" sx={{ mb: 3 }}>
                Failed to get technology detection results: {errors.tech}
              </Alert>
            ) : results.tech && Object.keys(results.tech).length > 0 ? (
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
            ) : (
              <Box sx={{ py: 3 }}>
                <Typography variant="body1">
                  No technology detection data available or still loading.
                </Typography>
                {/* Debug info */}
                <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Debug Information:</Typography>
                  <Typography variant="body2">
                    If you're expecting data, please check the browser console for raw API responses.
                  </Typography>
                </Box>
              </Box>
            )}
          </StyledPaper>
        </TabPanel>

        {/* Summary Tab */}
        <TabPanel value={tabValue} index={4}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>Scan Summary</Typography>

            {Object.values(errors).some(Boolean) && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                Some scan results are incomplete or unavailable. Please check individual tabs for details.
              </Alert>
            )}

            <Grid container spacing={3}>
              {[
                { label: 'SQL Injection', status: results.sql?.status, error: errors.sql },
                { label: 'XSS Vulnerability', status: results.xss?.status, error: errors.xss },
                { label: 'Command Injection', status: results.cmd?.status, error: errors.cmd }
              ].map((test, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <StyledPaper elevation={3}>
                    <Typography variant="h6" gutterBottom>{test.label}</Typography>
                    {test.error ? (
                      <Chip label="Scan Failed" sx={{ bgcolor: '#ff9800', color: '#fff' }} />
                    ) : test.status ? (
                      <VulnerabilityChip status={test.status} />
                    ) : (
                      <Chip label="No Data" sx={{ bgcolor: '#9e9e9e', color: '#fff' }} />
                    )}
                  </StyledPaper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>Overall Security Status</Typography>
              {hasAnyResults ? (
                <Typography color="text.secondary">
                  {Object.values(results).some(result => result?.status === 'vulnerable')
                    ? 'Vulnerabilities detected. Please review the detailed reports for each test.'
                    : 'No critical vulnerabilities detected in completed scans. Continue monitoring and maintaining security best practices.'}
                </Typography>
              ) : (
                <Typography color="text.secondary">
                  Unable to determine security status due to scan failures.
                </Typography>
              )}
            </Box>
          </StyledPaper>
        </TabPanel>
      </motion.div>
    </Container>
  );
};

export default Results;