import { useEffect, useRef } from 'react';
import styles from './Canvas.module.css'

class Particle {
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

    const draw = () => {
        canvasCtxRef.current.clearRect(0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        for(let i = 0; i < particles.current.length; i++) {
            particles.current[i].update(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
            particles.current[i].draw(canvasCtxRef.current);
            for(let k = i + 1; k < particles.current.length; k++) {
                const dx = particles.current[k].x - particles.current[i].x;
                const dy = particles.current[k].y - particles.current[i].y;
                const distance = dx * dx + dy * dy;
                
                if(distance < 100 * 100) {
                    canvasCtxRef.current.strokeStyle = `rgba(0, 191, 255, ${Math.max(0.2, 1 - (distance / (100 * 100)))})`
                    canvasCtxRef.current.beginPath();
                    canvasCtxRef.current.moveTo(particles.current[i].x, particles.current[i].y);
                    canvasCtxRef.current.lineTo(particles.current[k].x, particles.current[k].y);
                    canvasCtxRef.current.stroke();
                }
            }
        }
    }

    const animate = (timeStamp) => {
        const delta = timeStamp - lastTime.current;
        lastTime.current = timeStamp;
        if(timer.current > deltaTime.current){
            draw();
            timer.current = 0;
        } else {
            timer.current += delta;
        }

        requestAnimationFrame(animate);
    }

    useEffect(() => {
        particleCount.current = canvasRef.current.clientWidth / 13;

        canvasRef.current.width = canvasRef.current.clientWidth;
        canvasRef.current.height = canvasRef.current.clientHeight;

        addEventListener('resize', ()=>{
            canvasRef.current.width = canvasRef.current.clientWidth;
            canvasRef.current.height = canvasRef.current.clientHeight;
        });

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
    }, [])

    return <canvas ref={canvasRef} className={styles.Canvas}></canvas>
}

export default Canvas;