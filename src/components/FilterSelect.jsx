import React from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FaFilter } from "react-icons/fa";

const FilterSelect = ({ label, options, value, onChange }) => {
  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 160 }} variant="outlined">
      <InputLabel id={`filter-select-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`filter-select-label-${label}`}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        input={
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <FaFilter size={16} style={{ color: '#1976d2' }} />
              </InputAdornment>
            }
            label={label}
          />
        }
        sx={{ borderRadius: 2, background: '#f5f5f5' }}
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