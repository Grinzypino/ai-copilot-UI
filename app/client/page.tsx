"use client";

import { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import QuestionForm from "../components/generate";  
import "./styles.css";  

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string);
  };

  const handleGenerate = () => {
    
    const sampleQuestions = [
      "What is your name?",
      "What is your email?",
      "What is your phone number?",
      "What is your address?",
      "What is your occupation?",
    ];
    setQuestions(sampleQuestions);
    setOpenDialog(true);  
  };

  const handleGenerateDraft = () => {
    console.log("Generate Draft button clicked");
  };

  const handleDownload = () => {
    console.log("Download button clicked");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box className="container">
      <FormControl fullWidth>
        <InputLabel id="select-label">Options</InputLabel>
        <Select
          labelId="select-label"
          value={selectedOption}
          onChange={handleChange}
          label="Options"
        >
          <MenuItem value="Option1">Option 1</MenuItem>
          <MenuItem value="Option2">Option 2</MenuItem>
          <MenuItem value="Option3">Option 3</MenuItem>
          <MenuItem value="Option4">Option 4</MenuItem>
          <MenuItem value="Option5">Option 5</MenuItem>
        </Select>
      </FormControl>
      <Box className="buttonContainer">
        <Button variant="contained" color="primary" onClick={handleGenerate}>
          Generate
        </Button>
        <Button variant="contained" color="secondary" onClick={handleGenerateDraft}>
          Generate Draft
        </Button>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download
        </Button>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle className="dialogTitle">Question Form</DialogTitle>
        <DialogContent>
          <QuestionForm questions={questions} onClose={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </Box>
  );
}
