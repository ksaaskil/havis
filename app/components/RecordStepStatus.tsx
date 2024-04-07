import PlaybackButton from "./PlaybackButton";

export default function RecordStepStatus({
  result,
  processing,
  error,
}: {
  result: Blob | undefined;
  processing: boolean;
  error: Error | undefined;
}) {
  return (
    <div className="w-full text-xs">
      {processing && (
        <div className="p-4">
          <p className="font-bold">
            Nauhoitetaan
            <span className="ml-2 loading loading-dots loading-sm"></span>
          </p>
        </div>
      )}
      {!processing && error && (
        <div className="">
          <div>
            <h3 className="font-bold">Virhe: Nauhoittaminen epäonnistui</h3>
          </div>
        </div>
      )}
      {!processing && !error && result && (
        <div className="flex flex-row">
          <div>
            <h3 className="font-bold">Nauhoitus onnistui</h3>
            <div className="text-xs">
              {(result.size / 1024).toFixed(0)} kilotavua
            </div>
          </div>
          <div className="divider divider-horizontal"></div>
          <PlaybackButton audio={result} />
        </div>
      )}
    </div>
  );
}
