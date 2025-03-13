import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Page1 = () => {
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const [vals, setVals] = useState({ maxIndex: 150, currentIndex: 1 });

    const valsRef = useRef(vals); // Store values without triggering re-renders
    const imgLoaded = useRef(0);
    const canvasRef = useRef(null);
    const imgRef = useRef([]);

    useEffect(() => {
        preloadImages();
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleResize = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };

    const preloadImages = () => {
        for (let i = 1; i <= vals.maxIndex; i++) {
            const img = new Image();
            img.src = `imgs/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;

            img.onload = () => {
                imgLoaded.current++;
                imgRef.current[i] = img; // Store loaded image
                if (imgLoaded.current === vals.maxIndex) {
                    setAllImagesLoaded(true);
                    requestAnimationFrame(() => loadImage(1));
                }
            };
        }
    };

    const loadImage = (index) => {
        if (index < 1 || index > vals.maxIndex) return;

        const img = imgRef.current[index];
        const canvas = canvasRef.current;
        if (canvas && img) {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const newWidth = img.width * scale;
            const newHeight = img.height * scale;
            const offsetX = (canvas.width - newWidth) / 2;
            const offsetY = (canvas.height - newHeight) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

            valsRef.current.currentIndex = index;
            setVals((prevVals) => ({ ...prevVals, currentIndex: index }));
        }
    };

    useGSAP(() => {
        gsap.to(valsRef.current, {
            currentIndex: vals.maxIndex,
            scrollTrigger: {
                trigger: "#container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
                pin: true,
            },
            onUpdate: () => {
                requestAnimationFrame(() => loadImage(Math.round(valsRef.current.currentIndex)));
            },
        });
    }, [vals.maxIndex]);

    return (
        <div className="w-full overflow-hidden h-[600vh]">
            <div id="container" className="w-full h-[800vh] sticky top-0">
                <div className="w-full h-full">
                    <canvas ref={canvasRef} className="w-full h-screen object-cover"></canvas>
                </div>
            </div>
        </div>
    );
};

export default Page1;
