import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@material-ui/core';

const DataLogForm = ({ onSubmit, isLoading }) => {
  const [phone, setPhone] = useState('');
  const [voicemail, setVoicemail] = useState('');
  const [userId, setUserId] = useState('');
  const [clusterId, setClusterId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ phone, voicemail, userId, clusterId, startDate, endDate });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <TextField label="Voicemail" value={voicemail} onChange={(e) => setVoicemail(e.target.value)} />
        <TextField label="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <TextField label="Cluster ID" value={clusterId} onChange={(e) => setClusterId(e.target.value)} />
        <TextField type="date" label="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <TextField type="date" label="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </form>
    </Box>
  );
};

export default DataLogForm;
