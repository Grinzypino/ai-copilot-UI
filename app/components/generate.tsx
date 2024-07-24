import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface QuestionFormProps {
  questions: string[];
  onClose: () => void;
  onAnswersSubmitted: (userAnswers: object) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ questions, onClose, onAnswersSubmitted }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const userAnswers = Object.fromEntries(
      questions.map((_, index) => [index, answers[index] || ""])
    );

 
    try {
      const response = await fetch('http://127.0.0.1:5000/check_ans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_json: {},  
          expected_dict_ans: {},  
          q_dict: {},  
          user_ans: userAnswers,
        }),
      });
      const data = await response.json();

      // Call reframe_q API if there are unanswered questions
      if (data.q_dict_unans && Object.keys(data.q_dict_unans).length > 0) {
        const reframeResponse = await fetch('http://127.0.0.1:5000/reframe_q', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q_dict_unans: data.q_dict_unans,
            expected_dict_ans: {}, 
          }),
        });
        const reframeData = await reframeResponse.json();
        onAnswersSubmitted(reframeData.q_dict);
      }

      onClose();  
    } catch (error) {
      console.error('Error processing answers:', error);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Please answer the following questions:
      </Typography>
      {questions.map((question, index) => (
        <Box key={index} mb={2}>
          <Typography variant="body1">{question}</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={answers[index] || ""}
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
