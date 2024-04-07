"use client";
import { useAudioRecorder } from "react-audio-voice-recorder";
import dynamic from "next/dynamic";
import { resolveMimeType, useRecordVoice } from "@/app/hooks/useRecordVoice";
import { useObservations } from "./hooks/useObservations";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import useProcessing from "./hooks/useProcessing";
import SettingsDialog from "./components/SettingsDialog";
import ObservationsDialog from "./components/ObservationsDialog";
import InfoDialog from "./components/InfoDialog";
import RecordView from "./components/RecordView";

const Map = dynamic(() => import("./components/Map"), {
  loading: () => <p>Kartta latautuu...</p>,
  ssr: false,
});

export default function Home() {
  /* const {
    recording,
    startRecording,
    stopRecording,
    audio,
    error: errorRecording,
  } = useRecordVoice(); */

  const [errorRecording, setErrorRecording] = useState<
    DOMException | undefined
  >(undefined);

  const audioTrackConstraints = undefined;
  const onNotAllowedOrFound = (err: DOMException) => setErrorRecording(err);

  const [mimeType, setMimeType] = useState("audio/webm");
  const mediaRecorderOptions = { mimeType };

  useEffect(() => {
    setMimeType(resolveMimeType());
  }, []);

  const {
    startRecording,
    stopRecording,
    recordingBlob: audio,
    isRecording: recording,
  } = useAudioRecorder(
    audioTrackConstraints,
    onNotAllowedOrFound,
    mediaRecorderOptions,
  );

  const { processAudio, status: processingStatus } = useProcessing({
    recording,
    errorRecording,
  });

  useEffect(() => {
    if (audio) {
      processAudio(audio);
    }
  }, [audio, processAudio]);

  const { observations, createObservation } = useObservations();

  useEffect(() => {
    const result = processingStatus.result;
    if (result && !result.processed) {
      result.processed = true;
      createObservation(result);
    }
  }, [processingStatus, createObservation]);

  function toggleRecording() {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  const lastObservation = observations[observations.length - 1];

  const [showMap, setShowMap] = useState(false);

  function toggleMap() {
    setShowMap(!showMap);
  }

  return (
    <main className="min-h-screen">
      <NavBar toggleMap={toggleMap} />
      <div className="h-[calc(100vh-74px)] relative">
        <RecordView
          toggleRecording={toggleRecording}
          lastObservation={lastObservation}
          recording={recording}
          processingStatus={processingStatus}
        />
        {showMap && <Map />}
      </div>
      <SettingsDialog />
      <ObservationsDialog observations={observations} />
      <InfoDialog />
    </main>
  );
}
