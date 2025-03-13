import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Page1 = () => {
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const [vals, setVals] = useState({ maxIndex: 150, currentIndex: 1 });

    const valsRef = useRef(vals); // Store values without triggering re-renders
    const imgLoaded = useRef(0);
    const canvasRef = useRef(null);
    const imgRef = useRef([]); // Store preloaded images

    useEffect(() => {
        preloadImages();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleResize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    };

    const preloadImages = () => {
        for (let i = 1; i <= vals.maxIndex; i++) {
          
            const imgUrl = `imgs/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
            console.log('Preloading:', imgUrl);

            const img = new Image();
            img.src = imgUrl;
            // img.classList("w-full h-full object-fit")

            img.onload = () => {
                imgLoaded.current++;
                imgRef.current[i] = img; // Store loaded image
                if (imgLoaded.current === vals.maxIndex + 1) {
                    setAllImagesLoaded(true);
                    loadImage(1); // Start from the first frame after loading
                }
            };
        }
    };

    const loadImage = (index) => {
        if (index >= 0 && index <= vals.maxIndex) {
            const img = imgRef.current[index];
            const canvas = canvasRef.current;
            if (canvas && img) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
    
                    const scaleX = canvas.width / img.width;
                    const scaleY = canvas.height / img.height;
                    const scale = Math.max(scaleX, scaleY); // Use max for object-cover
    
                    const newWidth = img.width * scale;
                    const newHeight = img.height * scale;
    
                    const offsetX = (canvas.width - newWidth) / 2;
                    const offsetY = (canvas.height - newHeight) / 2;
    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    
                    valsRef.current.currentIndex = index; // Update the ref
                    setVals((prevVals) => ({
                        ...prevVals,
                        currentIndex: index,
                    }));
                }
            }
        }
    };
    

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                pin: true
            },
            // duration: 0.1,
            // ease: "Power2.easeInOut",
        });

        tl.to(valsRef.current, {
            currentIndex: vals.maxIndex,
            onUpdate: () => {
                loadImage(Math.round(valsRef.current.currentIndex)); // Use ref to avoid unnecessary renders
            },
        });
    }, [vals.maxIndex]); // Only update when maxIndex changes

    return (
        <div className="w-full overflow-hidden h-[600vh]  ">
        <div id="container" className="w-full h-[800vh] sticky top-0">
            <div className="w-full h-full">
                <canvas ref={canvasRef} className="w-full h-screen object-cover "></canvas>
            </div>
        </div>
    </div>
    );
};

export default Page1;
