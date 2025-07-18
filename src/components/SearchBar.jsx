import React from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, placeholder }) => {
  return (
    <OutlinedInput
      fullWidth
      size="small"
      onChange={(e) => onSearch(e.target.value)}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position="start">
          <FaSearch size={16} style={{ color: '#1976d2' }} />
        </InputAdornment>
      }
      sx={{ borderRadius: 2, background: '#f5f5f5' }}
    />
  );
};

export default SearchBar;