'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import FancyRectangle from '../components/fancyRectangle';

interface CarouselImage {
    src: string;
    alt: string;
}

const images: CarouselImage[] = [
    {
        src: '/images/duckCTF.jpg',
        alt: 'duckCTF',
    },
    {
        src: '/images/pizza.jpg',
        alt: 'Pizza',
    },
    {
        src: '/images/cyberPanel.jpg',
        alt: 'Cyber Panel',
    },
];

export default function ImageCarousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToNextImage = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
            setIsTransitioning(false);
        }, 500);
    };

    useEffect(() => {
        const interval = setInterval(goToNextImage, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative z-10">
            <FancyRectangle colour="purple" offset="8" filled={true}>
                <div className="relative bg-white w-full h-full">
                    <div
                        className={`transition-opacity duration-500 ease-in-out ${
                            isTransitioning ? 'opacity-0' : 'opacity-100'
                        }`}
                    >
                        <Image
                            src={images[currentImageIndex].src}
                            alt={images[currentImageIndex].alt}
                            width={533}
                            height={400}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </FancyRectangle>
        </div>
    );
}
