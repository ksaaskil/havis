import { MOCK_TRANSCRIPTION_RESPONSE } from "@/app/utils/config";
import fs from "fs";
import * as path from "path";
import * as os from "os";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const MOCK_TRANSCRIPTIONS = [
  "Kolme varista",
  "Kaksitoista kiurua",
  "Viisisataa kottaraista",
  "Lapin pöllö",
  "Amerikanjääkuikka",
];

const MAX_AUDIO_BYTE_LENGTH = 250 * 1024;
const TRANSCRIBE_TIMEOUT_SECONDS = 5;

const openai = new OpenAI();

interface ResponseData {
  text?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const body = req.body;
  const base64Audio = body.audio;
  const mimeType: string = body.mimeType;
  const audio = Buffer.from(base64Audio, "base64");

  const byteLength = audio.byteLength;

  if (byteLength >= MAX_AUDIO_BYTE_LENGTH) {
    res.status(400).json({
      error: `Audio too large: ${(byteLength / 1024).toFixed(0)} kB > ${MAX_AUDIO_BYTE_LENGTH / 1024} kB`,
    });
  }

  console.log(`Transcribing audio of ${audio.byteLength} bytes`);

  if (MOCK_TRANSCRIPTION_RESPONSE) {
    const randomIndex = Math.floor(Math.random() * MOCK_TRANSCRIPTIONS.length);
    const mockTranscription = MOCK_TRANSCRIPTIONS[randomIndex];
    res.status(200).json({ text: mockTranscription });
    return;
  }

  const extension = mimeType?.split("/")[1]?.split(";")[0] || "webm";

  const filePath = path.join(os.tmpdir(), `kurppa-input.${extension}`);

  try {
    console.log(`Writing file: ${filePath}`);
    fs.writeFileSync(filePath, audio);
    const readStream = fs.createReadStream(filePath);

    console.log(`Sending audio to OpenAI...`);
    const data = await openai.audio.transcriptions.create(
      {
        file: readStream,
        model: "whisper-1",
        language: "fi",
      },
      { timeout: TRANSCRIBE_TIMEOUT_SECONDS * 1000 },
    );
    console.log(`Got OpenAI speech-to-text transcription: ${data.text}`);
    res.status(200).json({ text: data.text });
  } catch (error) {
    console.error("Error transcribing audio", error);
    return res.status(500).json({ error: "Error transcribing" });
  }
}
