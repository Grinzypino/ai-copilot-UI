// components/JSONEditor.tsx

import React from "react";
import { Box } from "@mui/material";
import ReactJson from "react-json-view";

interface JSONEditorProps {
  data: object;
  onChange: (updatedData: object) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ data, onChange }) => {
  return (
    <Box>
      <ReactJson
        src={data}
        onEdit={(edit) => onChange(edit.updated_src)}
        onAdd={(add) => onChange(add.updated_src)}
        onDelete={(del) => onChange(del.updated_src)}
        theme="monokai"
        displayDataTypes={false}
      />
    </Box>
  );
};

export default JSONEditor;
