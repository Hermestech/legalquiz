import * as React from 'react';
import Router from 'next/router';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

interface QuestionaryCardProps { 
  questionary: QuestionaryType;
  onNextQuestionary: () => void;
  onPreviousQuestionary: () => void;
}

export function QuestionaryCard({
  questionary,
  onNextQuestionary,
  onPreviousQuestionary,
}: QuestionaryCardProps) {
  const router = Router;
  const theme = useTheme();

  function maxDescription (description: string) {
    if (description.length > 60) {
      return description.substring(0, 60) + '...';
    } else {
      return description;
    }
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {questionary.title}
          </Typography>
          <Typography
            sx={{
              overflowWrap: 'break-word',
              maxWidth: '250px',
            }}
            variant="subtitle1"
            color="text.secondary"
            component="div">
            {maxDescription(questionary.description)}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton
            aria-label="previous"
            onClick={() => onPreviousQuestionary()}
          >
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause"
            onClick={() => router.push(`/game/${questionary.sys.id}`)}
          >
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next"
            onClick={() => onNextQuestionary()}
          >
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={questionary.portrait.url}
        alt={questionary.portrait.title}
      />
    </Card>
  );
}