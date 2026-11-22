
'use client';

import { useState } from 'react';
import {
    CardMedia,
    IconButton,
    Typography,
    Box
} from '@mui/material';

interface ProductImageCarouselProps {
    images: string[];
}

const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return <Typography>No images available</Typography>;
    }

    const nextImage = () => {
        setCurrentIndex((prev) =>
            (prev + 1) % images.length
        );
    };

    const previousImage = () => {
        setCurrentIndex((prev) =>
            (prev - 1 + images.length) % images.length
        );
    };

    return (
        <Box sx={{ maxWidth: 500 }}>
            <CardMedia
                component="img"
                image={images[currentIndex]}
                alt={`Product image ${currentIndex + 1}`}
                sx={{
                    height: 350,
                    objectFit: 'contain'
                }}
            />

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
            }}>
                <IconButton onClick={previousImage}>
                    Previous
                </IconButton>

                <Typography>
                    {currentIndex + 1} / {images.length}
                </Typography>

                <IconButton onClick={nextImage}>
                    Next
                </IconButton>
            </Box>
        </Box>
    );
};

export default ProductImageCarousel;
