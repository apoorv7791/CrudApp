'use client';

import { memo } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Rating
} from '@mui/material';
import Link from 'next/link';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    rating: number;
    thumbnail: string;
    images: string[];
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = memo(({ product }: ProductCardProps) => {
    return (
        <Link
            href={`/products/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <Card sx={{ height: '100%' }}>
                <CardMedia
                    component="img"
                    height="180"
                    image={product.images?.[0] ?? product.thumbnail}
                    alt={product.title}
                    sx={{ objectFit: 'contain', p: 2 }}
                />

                <CardContent>
                    <Typography variant="h6">
                        {product.title}
                    </Typography>

                    <Typography variant="body1">
                        Price: ${product.price}
                    </Typography>

                    <Typography variant="body2">
                        Category: {product.category}
                    </Typography>

                    <Rating
                        value={product.rating}
                        precision={0.1}
                        readOnly
                    />

                    <Typography variant="body2">
                        View Product
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;