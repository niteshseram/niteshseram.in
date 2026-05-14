export function playImpact(ctx: AudioContext, intensity: number) {
  const now = ctx.currentTime;
  const duration = 0.09;
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const decay = 1 - i / bufferSize;
    data[i] = (Math.random() * 2 - 1) * decay * decay;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 600 + intensity * 2400;
  filter.Q.value = 1;

  const gain = ctx.createGain();
  const peak = 0.04 + intensity * 0.16;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + duration + 0.02);
}

export function playScrape(ctx: AudioContext, intensity: number) {
  const now = ctx.currentTime;
  const duration = 0.07;
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.6;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1800 + intensity * 1800;
  filter.Q.value = 0.7;

  const gain = ctx.createGain();
  const peak = 0.015 + intensity * 0.03;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + duration + 0.02);
}
