import React from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { FaFilter } from "react-icons/fa";

const FilterSelect = ({ label, options, value, onChange }) => {
  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 160, background: '#f5f5f5', borderRadius: 2 }}>
      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
        <FaFilter size={16} style={{ color: '#1976d2' }} />
        <InputLabel id={`filter-select-label-${label}`}>{label}</InputLabel>
      </Box>
      <Select
        labelId={`filter-select-label-${label}`}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        sx={{ borderRadius: 2 }}
      >
        <MenuItem value="">Tous</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;