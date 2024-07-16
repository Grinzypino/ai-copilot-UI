import React from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";


const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

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
        theme="google"
        displayDataTypes={false}
        iconStyle="circle"
      />
    </Box>
  );
};

export default JSONEditor;
