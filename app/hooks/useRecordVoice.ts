"use client";
import { useState, useRef, useCallback } from "react";
import { createMediaStream } from "@/app/utils/createMediaStream";

export function resolveMimeType() {
  const MEDIA_TYPES = ["audio/webm", "audio/mp3", "audio/mp4"];

  const supportedTypes = MEDIA_TYPES.filter((type) =>
    MediaRecorder.isTypeSupported(type),
  );
  return supportedTypes.length > 0 ? supportedTypes[0] : MEDIA_TYPES[0];
}

function useRecordVoice() {
  const [audio, setAudio] = useState(undefined as Blob | undefined);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const isRecording = useRef(false);

  const stream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef([] as Blob[]);

  function close() {
    const tracks = stream.current?.getTracks() || [];
    console.log(`Stopping ${tracks.length} tracks`);
    for (const track of tracks) {
      track.stop();
    }
    stream.current = null;
    mediaRecorder.current = null;
  }

  const initialize = useCallback(async function initialize() {
    if (typeof window !== "undefined") {
      stream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      initializeMediaRecorder(stream.current);
    }
  }, []);

  const startRecording = useCallback(async () => {
    setError(undefined);
    console.log(`Starting recording`);
    try {
      await initialize();
      if (mediaRecorder.current) {
        isRecording.current = true;
        mediaRecorder.current?.start();
      }
    } catch (err: any) {
      setError(err);
    }
    setRecording(true);
  }, [initialize]);

  const stopRecording = useCallback(() => {
    console.log(`Stop recording`);
    if (mediaRecorder.current) {
      isRecording.current = false;
      mediaRecorder.current?.stop();
      setRecording(false);
      close();
    }
  }, []);

  const initializeMediaRecorder = (stream: MediaStream) => {
    console.log(`Initializing media recorder...`);

    const mimeType = resolveMimeType();

    console.log(`Using mime type: ${mimeType}`);

    mediaRecorder.current = new MediaRecorder(stream, { mimeType });

    mediaRecorder.current.onstart = () => {
      console.log(`Media recorder onstart`);
      createMediaStream(stream);
      chunks.current = [];
    };

    mediaRecorder.current.ondataavailable = (ev) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.current.onstop = async () => {
      console.log(`Media recorder onstop`);
      const type = mimeType || mediaRecorder.current?.mimeType;
      console.log(
        `Creating audio blob of type ${type} from ${chunks.current.length} chunks`,
      );
      const audioBlob = new Blob(chunks.current, { type });
      setAudio(audioBlob);
    };
  };

  return { recording, startRecording, stopRecording, audio, error };
}

export { useRecordVoice };
