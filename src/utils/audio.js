// Web Audio API Synthesizer for futuristic sci-fi ZERO interface sounds
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleSound(enabled) {
    this.enabled = enabled !== undefined ? enabled : !this.enabled;
    return this.enabled;
  }

  // Soft crystalline click when hovering orbital nodes or nav items
  hover() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.04);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio context may be restricted before gesture
    }
  }

  // Harmonic chord when selecting an orbital node or opening a panel
  select() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const freqs = [587.33, 880, 1174.66]; // D5, A5, D6
      const now = this.ctx.currentTime;
      freqs.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.02);
        gain.gain.setValueAtTime(0.025, now + i * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.02 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.02);
        osc.stop(now + i * 0.02 + 0.25);
      });
    } catch {}
  }

  // Deep warp pulse when submitting a command
  pulse() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.28);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  // Cute mascot notification / happiness chirp
  mascotChirp() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.linearRampToValueAtTime(1400, now + 0.08);
      osc.frequency.linearRampToValueAtTime(1800, now + 0.16);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }
}

export const sound = new SoundFX();
