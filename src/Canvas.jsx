import { useEffect, useRef } from 'react';
import styles from './Canvas.module.css'

export class Particle {
    constructor(x, y, radius, velocityX, velocityY, color) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(canvasWidth, canvasHeight) {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if(this.x > canvasWidth || this.x < 0) {
            this.velocityX *= -1;
        }
        if(this.y > canvasHeight || this.y < 0) {
            this.velocityY *= -1;
        }
    }
}

const Canvas = () => {
    const canvasRef = useRef(null);
    const canvasCtxRef = useRef(null);
    const particles = useRef([]);
    const timer = useRef(0);
    const lastTime = useRef(0);
    const deltaTime = useRef(1000 / 90);
    const particleCount = useRef(100);
    const grid = useRef(new Map());
    const maximumReachDistance = 100 * 100;
const CELL_SIZE = 100; // Use same as max reach for optimal bucketing

const draw = () => {
    const ctx = canvasCtxRef.current;
    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    // --- Spatial Grid Setup ---
     // key: "col_row", value: array of particle indices

    // Bucket particles into grid
    for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.update(width, height);
        p.draw(ctx);

        const col = Math.floor(p.x / CELL_SIZE);
        const row = Math.floor(p.y / CELL_SIZE);

        const key = `${col}_${row}`;
        if (!grid.current.has(key)) grid.current.set(key, []);
        grid.current.get(key).push(i);
    }


    for (let i = 0; i <  particles.current.length; i++) {
        const p = particles.current[i];
        const col = Math.floor(p.x / CELL_SIZE);
        const row = Math.floor(p.y / CELL_SIZE);

        for (let dc = -1; dc <= 1; dc++) {
            for (let dr = -1; dr <= 1; dr++) {
                const neighborKey = `${col + dc}_${row + dr}`;
                const neighbors = grid.current.get(neighborKey);
                if (!neighbors) continue;

                for (const j of neighbors) {
                    if (j <= i) continue;

                    const q = particles.current[j];
                    const dx = q.x - p.x;
                    const dy = q.y - p.y;
                    const distanceSq = dx * dx + dy * dy;

                    if (distanceSq < maximumReachDistance) {
                        const opacity = Math.max(0.2, 1 - distanceSq / maximumReachDistance);
                        ctx.strokeStyle = `rgba(0, 191, 255, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }
            }
        }
    }
    grid.current.clear();
};

const animate = (timeStamp) => {
    // Calculate the time elapsed since the last frame
    const delta = timeStamp - lastTime.current;

    // Use a fixed step size for logic updates (e.g., 16.67ms for 60 FPS)
    const fixedTimeStep = 1000 / 60; 

    timer.current += delta; // Accumulate the elapsed time

    // Update the simulation logic in fixed steps
    while (timer.current >= fixedTimeStep) {
        // Only run the expensive draw/update logic once per fixed step
        draw(); 
        timer.current -= fixedTimeStep;
    }
    
    // Update lastTime for the next frame calculation
    lastTime.current = timeStamp; 

    requestAnimationFrame(animate);
}
    useEffect(() => {
        if(canvasCtxRef.current) return;
        particleCount.current = canvasRef.current.clientWidth / 7.5;

        canvasRef.current.width = canvasRef.current.clientWidth;
        canvasRef.current.height = canvasRef.current.clientHeight;
const handleResize = () => {
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;
    // You may also want to recalculate particleCount here if you want it dynamic on resize
};
        window.addEventListener('resize', handleResize);

        canvasCtxRef.current = canvasRef.current.getContext('2d');
        canvasCtxRef.current.fillStyle = '#00BFFF';
        canvasCtxRef.current.strokeStyle = '#00BFFF';

        for(let i = 0; i < particleCount.current; i++) {
            particles.current.push(new Particle(Math.random() * canvasRef.current.clientWidth,
                Math.random() * canvasRef.current.clientHeight,
                2.5,
                Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, '#00BFFF'))
        }
        animate(0);
        return () => {window.removeEventListener('resize', handleResize)};
    }, [])

    return <canvas ref={canvasRef} className={styles.Canvas}></canvas>
}

export default Canvas;