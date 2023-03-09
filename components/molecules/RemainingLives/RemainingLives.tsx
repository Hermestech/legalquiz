import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";
import useAppContext from "../../../contexts/AppContext";


const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export const RemainingLives = () => {
    const { lifes } = useAppContext()
    const [value, setValue] = useState(lifes);
    return (
      <StyledRating
        name="customized-color"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue as number);
        }}
        getLabelText={(lifes: number) => `${lifes} Heart${lifes !== 1 ? 's' : ''}`}
        precision={1}
        max={lifes}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
    )
}
