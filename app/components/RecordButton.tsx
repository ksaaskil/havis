export default function RecordButton({
  processing,
  toggleRecording,
  recording,
}: {
  processing: boolean;
  toggleRecording: () => void;
  recording: boolean;
}) {
  const btnClassSuffix = recording
    ? "neutral"
    : processing
      ? "neutral"
      : "primary";
  return (
    <button
      className={`btn btn-lg bg-${btnClassSuffix} btn-circle`}
      disabled={processing}
      onClick={toggleRecording}
    >
      {recording ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="red"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
            clipRule="evenodd"
          />
        </svg>
      ) : processing ? (
        <>
          <span className="loading loading-dots loading-sm"></span>
        </>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="primary w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
          />
        </svg>
      )}
    </button>
  );
}
