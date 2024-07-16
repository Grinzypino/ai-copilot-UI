"use client";

import { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import QuestionForm from "../components/generate";
import JSONEditor from "../components/jsoneditor";
import "./styles.css";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [openQuestionDialog, setOpenQuestionDialog] = useState<boolean>(false);
  const [openJSONDialog, setOpenJSONDialog] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [draftData, setDraftData] = useState<object | null>(null);

  const handleChange = (event: SelectChangeEvent<string>) => {
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
    setOpenQuestionDialog(true);
  };

  const handleGenerateDraft = () => {
    const sampleDraft = {
      title: "Sample Draft",
      description: "This is a sample draft description.",
      date: "2024-07-16",
      items: [
        { id: 1, name: "Item 1", value: "Value 1" },
        { id: 2, name: "Item 2", value: "Value 2" },
      ],
    };
    setDraftData(sampleDraft);
    setOpenJSONDialog(true);
  };

  const handleDownload = () => {
    if (draftData) {
      const blob = new Blob([JSON.stringify(draftData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "draft.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleCloseQuestionDialog = () => {
    setOpenQuestionDialog(false);
  };

  const handleCloseJSONDialog = () => {
    setOpenJSONDialog(false);
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
      <Dialog open={openQuestionDialog} onClose={handleCloseQuestionDialog}>
        <DialogTitle className="dialogTitle">Question Form</DialogTitle>
        <DialogContent>
          <QuestionForm questions={questions} onClose={handleCloseQuestionDialog} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleCloseQuestionDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openJSONDialog} onClose={handleCloseJSONDialog} maxWidth="md" fullWidth>
        <DialogTitle className="dialogTitle">Edit Draft</DialogTitle>
        <DialogContent>
          {draftData && <JSONEditor data={draftData} onChange={(updatedData) => setDraftData(updatedData)} />}
        </DialogContent>
        <DialogActions className="dialogActions">
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download JSON
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCloseJSONDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
