/**
 * DevCollab Glowing Audio-Wave Visualization Engine
 * 
 * Supports:
 * - Real-time synthetic speech oscillation with frequency harmonics
 * - Web Audio API mic input support if user grants permission
 * - Neon cyan & electric purple glow filters
 * - Dynamic responsiveness to Mute / Active speaking states
 */

class AudioWaveVisualizer {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.phase = 0;
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.isRealAudio = false;
    this.dataArray = null;
    this.isMuted = false;
  }

  attach(canvasElement) {
    this.canvas = canvasElement;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = (rect.width || 360) * dpr;
    this.canvas.height = (rect.height || 100) * dpr;
    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }
  }

  start(isMuted = false) {
    this.isMuted = isMuted;
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.loop();
  }

  setMuted(muted) {
    this.isMuted = muted;
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.ctx && this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      this.ctx.clearRect(0, 0, rect.width, rect.height);
    }
  }

  // Attempt real microphone stream if user clicks "Mic input"
  async enableRealMic() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return false;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.isRealAudio = true;
      return true;
    } catch (err) {
      console.warn("Real mic not allowed or unavailable; falling back to high-fidelity audio simulation", err);
      this.isRealAudio = false;
      return false;
    }
  }

  loop() {
    if (!this.canvas || !this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width || 360;
    const height = rect.height || 100;
    const centerY = height / 2;

    this.ctx.clearRect(0, 0, width, height);

    // If muted, draw a flat gentle baseline
    if (this.isMuted) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, centerY);
      this.ctx.lineTo(width, centerY);
      this.ctx.strokeStyle = "rgba(100, 116, 139, 0.4)";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.animationId = requestAnimationFrame(() => this.loop());
      return;
    }

    this.phase += 0.06;

    // Draw 3 layered glowing harmonic sine curves
    const waves = [
      { color: "rgba(0, 217, 255, 0.85)", shadow: "#00d9ff", amp: 26, freq: 0.022, speed: 1.0, lineWidth: 3.5 },
      { color: "rgba(99, 102, 241, 0.7)", shadow: "#6366f1", amp: 18, freq: 0.035, speed: -1.3, lineWidth: 2.5 },
      { color: "rgba(168, 85, 247, 0.8)", shadow: "#a855f7", amp: 22, freq: 0.018, speed: 0.8, lineWidth: 2.0 }
    ];

    // Compute live intensity modifier
    let audioLevel = 1.0;
    if (this.isRealAudio && this.analyser && this.dataArray) {
      this.analyser.getByteFrequencyData(this.dataArray);
      const sum = this.dataArray.reduce((acc, v) => acc + v, 0);
      const avg = sum / this.dataArray.length;
      audioLevel = Math.max(0.2, avg / 60);
    } else {
      // Natural speech rhythm pulsation simulator
      audioLevel = 0.5 + 0.5 * Math.sin(this.phase * 0.4) * Math.sin(this.phase * 0.85);
      if (audioLevel < 0.2) audioLevel = 0.25;
    }

    waves.forEach(w => {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = w.color;
      this.ctx.shadowColor = w.shadow;
      this.ctx.shadowBlur = 14;
      this.ctx.lineWidth = w.lineWidth;
      this.ctx.lineCap = "round";

      for (let x = 0; x <= width; x += 3) {
        // Apply envelope so edges taper to center
        const normalizedX = x / width;
        const envelope = Math.sin(normalizedX * Math.PI); // 0 at edges, 1 at center
        const y = centerY + Math.sin(x * w.freq + this.phase * w.speed) * (w.amp * audioLevel) * envelope;

        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
      this.ctx.restore();
    });

    // Draw central audio equalizer frequency nodes
    const barCount = 20;
    const barSpacing = width / (barCount + 1);
    for (let i = 1; i <= barCount; i++) {
      const bx = i * barSpacing;
      const norm = Math.abs(i - barCount / 2) / (barCount / 2);
      const hFactor = (1 - norm * 0.8) * audioLevel;
      const barHeight = Math.max(4, Math.sin(this.phase * 2 + i * 0.5) * 16 * hFactor + 14 * hFactor);

      const grad = this.ctx.createLinearGradient(bx, centerY - barHeight, bx, centerY + barHeight);
      grad.addColorStop(0, "#00d9ff");
      grad.addColorStop(0.5, "#6366f1");
      grad.addColorStop(1, "#a855f7");

      this.ctx.save();
      this.ctx.fillStyle = grad;
      this.ctx.shadowColor = "#00d9ff";
      this.ctx.shadowBlur = 6;
      this.ctx.beginPath();
      this.ctx.roundRect(bx - 1.5, centerY - barHeight, 3, barHeight * 2, 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animationId = requestAnimationFrame(() => this.loop());
  }
}

window.AudioWaveVisualizer = AudioWaveVisualizer;
