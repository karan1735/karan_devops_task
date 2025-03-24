import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { PlayArrow, Pause, Refresh, SkipNext } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress((newTime / (isBreak ? 5 * 60 : 25 * 60)) * 100);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      setProgress(100);
      // Play notification sound
      new Audio(
        "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
      ).play();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
    setProgress(100);
  };

  const skipTimer = () => {
    setIsRunning(false);
    setIsBreak(!isBreak);
    setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
    setProgress(100);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
        <AppBar position="static" elevation={0}>
          <Container maxWidth="sm">
            <Box sx={{ py: 2 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                Pomodoro Timer
              </Typography>
            </Box>
          </Container>
        </AppBar>

        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "white",
              border: "1px solid #eaeaea",
              textAlign: "center",
            }}
          >
            <Box sx={{ position: "relative", display: "inline-block", mb: 4 }}>
              <CircularProgress
                variant="determinate"
                value={progress}
                size={200}
                thickness={4}
                sx={{ color: isBreak ? "secondary.main" : "primary.main" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Typography
                  variant="h2"
                  component="div"
                  sx={{ fontWeight: 700 }}
                >
                  {formatTime(timeLeft)}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                  {isBreak ? "Break Time" : "Focus Time"}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <IconButton
                onClick={toggleTimer}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                {isRunning ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton
                onClick={resetTimer}
                sx={{
                  backgroundColor: "grey.200",
                  "&:hover": {
                    backgroundColor: "grey.300",
                  },
                }}
              >
                <Refresh />
              </IconButton>
              <IconButton
                onClick={skipTimer}
                sx={{
                  backgroundColor: "grey.200",
                  "&:hover": {
                    backgroundColor: "grey.300",
                  },
                }}
              >
                <SkipNext />
              </IconButton>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
