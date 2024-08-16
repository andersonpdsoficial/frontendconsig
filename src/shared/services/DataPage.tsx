import { useEffect, useState } from 'react';
import { fetchDataFromBackend } from '../services/apiService';
import { Container, Typography } from '@mui/material';

const DataPage = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchDataFromBackend();
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    getData();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Data from API</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default DataPage;
