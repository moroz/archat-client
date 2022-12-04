import "./App.css";
import * as Peer from "simple-peer/simplepeer.min.js";
import { useCallback, useRef } from "react";

function getVideoStream() {
  return navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });
}

function App() {
  const sourceVideoRef = useRef<HTMLVideoElement | null>(null);
  const targetVideoRef = useRef<HTMLVideoElement | null>(null);

  const peer1ref = useRef<Peer.Instance | null>();
  const peer2ref = useRef<Peer.Instance | null>();

  const onStart = useCallback(async () => {
    const stream = await getVideoStream();
    peer1ref.current = new Peer({ initiator: true, stream });
    peer2ref.current = new Peer();

    peer1ref.current.on("signal", (data: any) => {
      console.log("peer 1 signal", data);
      peer2ref.current?.signal(data);
    });

    peer2ref.current?.on("signal", (data: any) => {
      console.log("peer 2 signal", data);
      peer1ref.current?.signal(data);
    });

    peer2ref.current.on("stream", (stream: any) => {
      targetVideoRef.current!.srcObject = stream;
    });

    try {
      if (sourceVideoRef.current) {
        sourceVideoRef.current.srcObject = stream;
      }
    } catch (e) {
      console.error(e);
    }
  }, [sourceVideoRef.current, targetVideoRef.current]);

  return (
    <div className="App">
      <div className="grid">
        <video autoPlay ref={sourceVideoRef} />
        <video autoPlay ref={targetVideoRef} />
      </div>
      <button type="button" onClick={onStart}>
        Start chat
      </button>
    </div>
  );
}

export default App;
