// components/QuestionForm.tsx

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface QuestionFormProps {
  questions: string[];
  onClose: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ questions, onClose }) => {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    onClose(); // Close the modal
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Please answer the following questions:
      </Typography>
      {questions.map((question, index) => (
        <Box key={index} mb={2}>
          <Typography variant="body1">{question}</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={answers[index]}
            onChange={(event) => handleChange(index, event)}
            placeholder={`Answer ${index + 1}`}
          />
        </Box>
      ))}
    <Box className="dialogActions">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionForm;
