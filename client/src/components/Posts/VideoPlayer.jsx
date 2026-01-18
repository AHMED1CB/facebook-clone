import { useRef, useState } from "react";
import { PlayArrow, Pause, VolumeUp, VolumeOff } from "@mui/icons-material";
import { Box, IconButton, Slider } from "@mui/material";

export default ({ src }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", backgroundColor: "#000" }}>
      <Box
        component="video"
        ref={videoRef}
        src={src}
        sx={{
          width: "100%",
          maxHeight: "400px",
          display: "block",
          objectFit: "contain",
        }}
        onEnded={() => setPlaying(false)}
      />

      {/* Custom Controls */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          padding: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton onClick={togglePlay} sx={{ color: "white" }}>
          {playing ? <Pause /> : <PlayArrow />}
        </IconButton>

        <IconButton onClick={toggleMute} sx={{ color: "white" }}>
          {muted ? <VolumeOff /> : <VolumeUp />}
        </IconButton>

        {/* Volume Slider */}
        <Slider
          defaultValue={100}
          sx={{ width: 100, color: "white" }}
          onChange={(e, value) => {
            if (videoRef.current) videoRef.current.volume = value / 100;
          }}
        />
      </Box>
    </Box>
  );
};
