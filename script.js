/**
 * GLOBAL INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Clock
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Initialize Voltage Monitor (Oscilloscope)
    initVoltageMonitor();

    // 3. Initialize Decorative Navbar Coordinates
    initNavbarCoords();

    // 4. Initialize Music Player
    initMusicPlayer();

    // 5. Entrance Animation for Cards
    animateEntrance();
});

/**
 * 1. CLOCK LOGIC
 */
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;
    const now = new Date();
    const options = { 
        timeZone: 'Asia/Jakarta', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', // Ditambah detik agar lebih teknis
        hour12: false 
    };
    clockElement.textContent = now.toLocaleTimeString('en-GB', options);
}

/**
 * 2. VOLTAGE MONITOR (OSCILLOSCOPE)
 */
function initVoltageMonitor() {
    const canvas = document.getElementById('voltageCanvas');
    const voltDisplay = document.getElementById('voltageValue');
    if (!canvas || !voltDisplay) return;

    const ctx = canvas.getContext('2d');
    let points = [];
    let angle = 0;

    function render() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.beginPath();

        angle += 0.05;
        // Simulasi tegangan 220V dengan sedikit noise
        let currentVolt = (220 + Math.sin(angle) * 1.2 + Math.random() * 0.4).toFixed(1);
        voltDisplay.textContent = currentVolt + "V";

        points.push(Math.sin(angle) * (canvas.height/3) + canvas.height/2);
        if (points.length > canvas.width / 5) points.shift();

        for (let i = 0; i < points.length; i++) {
            let x = i * 5;
            let y = points[i];
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        requestAnimationFrame(render);
    }
    render();
}

/**
 * 3. NAVBAR COORDINATES
 */
function initNavbarCoords() {
    const coordText = document.getElementById('coordText');
    if (!coordText) return;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth * 100).toFixed(2);
        const y = (e.clientY / window.innerHeight * 100).toFixed(2);
        coordText.textContent = `${y}°N ${x}°E`;
    });
}

/**
 * 4. MUSIC PLAYER
 */
function initMusicPlayer() {
    const musicCard = document.getElementById('music-player');
    const audio = document.getElementById('audio-track');
    const cdDisk = document.getElementById('cd-disk');
    const progressBar = document.getElementById('audio-progress');
    
    if (!musicCard || !audio) return;

    let isPlaying = false;

    musicCard.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            if(cdDisk) cdDisk.style.animationPlayState = 'paused';
        } else {
            audio.play().catch(() => console.log("User interaction required for audio"));
            if(cdDisk) cdDisk.style.animationPlayState = 'running';
        }
        isPlaying = !isPlaying;
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration && progressBar) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });
}

/**
 * 5. UTILS & ANIMATION
 */
function animateEntrance() {
    document.querySelectorAll('.bento-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
}

// Global Copy Function (Needs to be global for onclick)
window.copyText = function(text) {
    const btn = event.currentTarget;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "COPIED_TO_CLIPBOARD";
        btn.style.backgroundColor = "#6366f1";
        btn.style.color = "#fff";
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = "#fff";
            btn.style.color = "#000";
        }, 2000);
    });
};