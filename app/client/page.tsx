"use client";
import Link from "next/link";
import { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography } from "@mui/material";
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

  const handleGenerate = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/generate_q', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schema_path: 'schemaNexamples.json' }),
      });
      const data = await response.json();
      setQuestions(Object.values(data.q_dict));
      setOpenQuestionDialog(true);
    } catch (error) {
      console.error('Error generating questions:', error);
    }
  };

  const handleGenerateDraft = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/generate_draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ current_json: draftData }),
      });
      const data = await response.json();
      setDraftData(data);
      setOpenJSONDialog(true);
    } catch (error) {
      console.error('Error generating draft:', error);
    }
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

  const handleSaveJSON = () => {
    if (draftData) {
      console.log("Saving JSON Data:", draftData);
    }
    handleCloseJSONDialog();
  };

  return (
    <Container maxWidth="sm" className="container">
      <Link href="/"> 
        <Typography className="title" variant="h4" gutterBottom>
          Client Panel
        </Typography>
      </Link>
      <Box className="box">
        <FormControl fullWidth>
          <InputLabel id="select-label">Select Cases</InputLabel>
          <Select
            labelId="select-label"
            value={selectedOption}
            onChange={handleChange}
            label="Select Cases"
          >
            <MenuItem value="Option1">Civil Law</MenuItem>
            <MenuItem value="Option2">Criminal Law</MenuItem>
            <MenuItem value="Option3"> Land Cases</MenuItem>
            <MenuItem value="Option4"> Marriage Cases</MenuItem>
            <MenuItem value="Option5"> Writ Petition</MenuItem>
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
          </DialogActions>
        </Dialog>
        <Dialog open={openJSONDialog} onClose={handleCloseJSONDialog} maxWidth="md" fullWidth>
          <DialogTitle className="dialogTitle">Edit Draft</DialogTitle>
          <DialogContent>
            {draftData && <JSONEditor data={draftData} onChange={(updatedData) => setDraftData(updatedData)} />}
          </DialogContent>
          <DialogActions className="dialogActions">
            <Button variant="contained" color="primary" onClick={handleSaveJSON}>
              Save
            </Button>
            <Button variant="contained" color="primary" onClick={handleDownload}>
              Download JSON
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseJSONDialog}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
