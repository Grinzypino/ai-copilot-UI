// pages/admin.tsx
"use client";

import React, { useState } from 'react';
import { Container, Box, TextField, IconButton, Button, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UploadIcon from '@mui/icons-material/Upload';
import './styles.css';

const predefinedTypes = ['Civil Law', 'Criminal Law', 'Land Cases', 'Marriage Cases', 'Writ Petition', 'Custom'];

export default function AdminPanel() {
  const [inputFields, setInputFields] = useState<Array<{ type: string; customType: string; file: File | null }>>([
    { type: '', customType: '', file: null },
  ]);

  const handleAddField = () => {
    setInputFields([...inputFields, { type: '', customType: '', file: null }]);
  };

  const handleRemoveField = (index: number) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleTypeChange = (index: number, event: SelectChangeEvent<string>) => {
    const values = [...inputFields];
    values[index].type = event.target.value as string;
    if (event.target.value !== 'Custom') {
      values[index].customType = '';
    }
    setInputFields(values);
  };
const handleCustomTypeChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
  const values = [...inputFields];
  values[index].customType = (event.target as HTMLInputElement).value;
  setInputFields(values);
};
  
  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...inputFields];
    if (event.target.files) {
      values[index].file = event.target.files[0];
    }
    setInputFields(values);
  };

  const handleTrain = () => {
    console.log('Training with the following data:', inputFields);
   
  };

  return (
    <Container maxWidth="md" className="container">
      <Box className="box">
        <Typography variant="h4" gutterBottom>
          Admin Panel
        </Typography>
        {inputFields.map((inputField, index) => (
          <Box key={index} className="inputRow">
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Document Type</InputLabel>
              <Select
                value={inputField.type}
                onChange={(event) => handleTypeChange(index, event)}
                label={`Document Type`}
              >
                {predefinedTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {inputField.type === 'Custom' && (
              <TextField
                label="Custom Type"
                variant="outlined"
                value={inputField.customType}
               onChange={(event) => handleCustomTypeChange(index, event as React.ChangeEvent<HTMLInputElement>)}
                fullWidth
                margin="normal"
              />
            )}
            <input
              type="file"
              id={`file-input-${index}`}
              style={{ display: 'none' }}
            onChange={(event) => handleFileChange(index, event as React.ChangeEvent<HTMLInputElement>)}
            />
            <label htmlFor={`file-input-${index}`}>
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadIcon />}
                className="uploadButton"
              >
                {inputField.file ? 'Edit File' : 'Upload File'}
              </Button>
            </label>
            {inputField.file && (
              <Typography variant="body2" className="fileName">
                {inputField.file.name}
              </Typography>
            )}
            <IconButton onClick={handleAddField} color="primary">
              <AddIcon />
            </IconButton>
            {inputFields.length > 1 && (
              <IconButton onClick={() => handleRemoveField(index)} color="secondary">
                <RemoveIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Box className="trainButton">
          <Button variant="contained" color="primary" onClick={handleTrain}>
            Train
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
