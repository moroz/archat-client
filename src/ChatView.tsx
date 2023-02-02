import "./App.css";
import type { Instance } from "simple-peer";
import SimplePeer from "simple-peer/simplepeer.min.js";
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

  const peer = useRef<Instance | null>();

  // const onStart = useCallback(async () => {
  //   const stream = await getVideoStream();
  //   peer.current = new SimplePeer({ initiator: true, stream });

  //   peer.current?.on("signal", (data: any) => {
  //     SignalSocket.instance.broadcast(JSON.stringify(data));
  //   });

  //   peer.current?.on("stream", (stream: any) => {
  //     targetVideoRef.current!.srcObject = stream;
  //   });

  //   SignalSocket.instance.onMessage((message) => {
  //     if (Array.isArray(message)) return;
  //     peer.current?.signal(message);
  //   });

  //   try {
  //     if (sourceVideoRef.current) {
  //       sourceVideoRef.current.srcObject = stream;
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [sourceVideoRef.current, targetVideoRef.current]);

  return (
    <div className="App">
      <div className="grid">
        <video autoPlay ref={sourceVideoRef} />
        <video autoPlay ref={targetVideoRef} />
      </div>
      <button type="button" onClick={() => null}>
        Start chat
      </button>
    </div>
  );
}

export default App;
