# QVAC Public Speaking Opener Writer

Enter your talk's topic and audience, get a strong opening hook line for a speech — generated on-device. No cloud call, no API key.

## Run

```bash
npm install
npm start
```

Then open http://localhost:32022

## QVAC SDK version

`@qvac/sdk` ^0.19.0 (see `package.json`).

## How it works

Built on [Tether's QVAC SDK](https://www.npmjs.com/package/@qvac/sdk) — all inference runs on-device, no cloud call, no API key. The app loads `LLAMA_3_2_1B_INST_Q4_0` locally with `loadModel()`, generates with `completion()` (streamed via `tokenStream`), and releases the model with `unloadModel()` on shutdown.

## Example

**Input:** topic `the science of habit formation`, audience `high school students`

**Output:**
```
As you're trying to master the art of procrastination, you're actually building a muscle that will serve you for the rest of your life, one minor setback at a time.
```

## License

MIT
