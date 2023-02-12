import React, { useEffect, useRef } from "react";
import styles from "./VideoContainer.module.sass";

interface Props {
  stream: MediaStream | null;
}

const VideoContainer: React.FC<Props> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.srcObject = stream;
  }, [videoRef.current, stream]);

  return (
    <div className={styles.root}>
      <video autoPlay ref={videoRef} />
    </div>
  );
};

export default VideoContainer;
