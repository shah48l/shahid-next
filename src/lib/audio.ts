"use client";

const LOBBY_TIME_URL = "/audio/lobby-time.mp3";
type AudioContextCtor = typeof AudioContext;
type WindowWithWebkitAudio = Window & { webkitAudioContext?: AudioContextCtor };

// ═══ SOUND EFFECTS ═══
class SFXEngine {
  private ctx: AudioContext | null = null;
  enabled = false;

  private getCtx() {
    const audioContextCtor = window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;
    if (!audioContextCtor) throw new Error("Web Audio is not supported in this browser.");
    if (!this.ctx) this.ctx = new audioContextCtor();
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  playHover() {
    if (!this.enabled) return;
    const c = this.getCtx(), o = c.createOscillator(), g = c.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(3200, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(1800, c.currentTime + 0.04);
    g.gain.setValueAtTime(0.03, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.06);
    o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + 0.06);
  }

  playClick() {
    if (!this.enabled) return;
    const c = this.getCtx(), o = c.createOscillator(), g = c.createGain();
    o.type = "triangle"; o.frequency.setValueAtTime(800, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(300, c.currentTime + 0.08);
    g.gain.setValueAtTime(0.07, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
    o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + 0.1);
  }

  private lastTick = 0;
  playScrollTick() {
    if (!this.enabled) return;
    const now = Date.now(); if (now - this.lastTick < 150) return; this.lastTick = now;
    const c = this.getCtx(), o = c.createOscillator(), g = c.createGain();
    o.type = "sine"; o.frequency.value = 1200 + Math.random() * 400;
    g.gain.setValueAtTime(0.008, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.02);
    o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + 0.025);
  }

  playCardHover() {
    if (!this.enabled) return;
    const c = this.getCtx();
    [600, 900].forEach((freq, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = "sine"; o.frequency.value = freq;
      const t = c.currentTime + i * 0.04;
      g.gain.setValueAtTime(0.04, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + 0.1);
    });
  }

  playBoot() {
    // Always plays regardless of enabled — one-time startup chime
    try {
      const c = this.getCtx();
      // Ascending C-major arpeggio: C4 → E4 → G4 → C5
      const notes = [
        { freq: 261.63, t: 0,    dur: 0.35 },
        { freq: 329.63, t: 0.18, dur: 0.35 },
        { freq: 392.00, t: 0.36, dur: 0.35 },
        { freq: 523.25, t: 0.54, dur: 0.70 },
      ];
      notes.forEach(({ freq, t, dur }) => {
        const o = c.createOscillator(), g = c.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        const s = c.currentTime + t;
        g.gain.setValueAtTime(0, s);
        g.gain.linearRampToValueAtTime(0.13, s + 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, s + dur);
        o.connect(g).connect(c.destination);
        o.start(s); o.stop(s + dur + 0.01);
      });
    } catch { /* silently fail if no audio context */ }
  }

  toggle() { this.enabled = !this.enabled; return this.enabled; }
}

// ═══ MUSIC PLAYER ═══
class JazzEngine {
  private audio: HTMLAudioElement | null = null;
  playing = false;

  private getAudio() {
    if (!this.audio) {
      this.audio = new Audio(LOBBY_TIME_URL);
      this.audio.loop = true;
      this.audio.preload = "auto";
      this.audio.crossOrigin = "anonymous";
      this.audio.volume = 0.42;
      this.audio.addEventListener("pause", () => {
        this.playing = false;
      });
      this.audio.addEventListener("play", () => {
        this.playing = true;
      });
    }
    return this.audio;
  }

  start() {
    const audio = this.getAudio();
    audio.currentTime = audio.currentTime || 0;
    this.playing = true;
    void audio.play().catch(() => {
      this.playing = false;
    });
  }

  stop() {
    if (!this.audio) return;
    this.playing = false;
    this.audio.pause();
  }

  toggle() { if (this.playing) this.stop(); else this.start(); return this.playing; }
}

export const sfx = typeof window !== "undefined" ? new SFXEngine() : null;
export const jazz = typeof window !== "undefined" ? new JazzEngine() : null;
