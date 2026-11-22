'use client'
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Rating
} from '@mui/material';
import Link from 'next/link';

import { useState, useEffect } from 'react';

import { Pagination, TextField } from '@mui/material';
import { useProductStore } from '@/store/productStore';

const ProductDashBoard = () => {

    const [page, setPage] = useState(1);
    const [searchQuerry, setSearchQuery] = useState('');
    const productsList = useProductStore((state) => state.products);
    const loading = useProductStore((state) => state.loading);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const total = useProductStore((state) => state.total);
    const limit = useProductStore((state) => state.limit);
    const [category, setCategory] = useState('');
    const skip = (page - 1) * limit
    useEffect(() => {
        fetchProducts(skip, searchQuerry, category);
    }, [fetchProducts, skip, searchQuerry, category]);
    return (

        <>
            <h1>Products DashBoard</h1>
            {loading && <Typography>Loading products...</Typography>}

            <FormControl sx={{ minWidth: 200, mb: 3 }}>
                <InputLabel id="category-label">
                    Category
                </InputLabel>

                <Select
                    labelId="category-label"
                    id="category-select"
                    value={category}
                    label="Category"
                    onChange={(event) => {
                        setCategory(event.target.value);
                        setPage(1);
                    }}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="beauty">Beauty</MenuItem>
                    <MenuItem value="fragrances">Fragrances</MenuItem>
                    <MenuItem value="furniture">Furniture</MenuItem>
                    <MenuItem value="groceries">Groceries</MenuItem>
                    <MenuItem value="smartphones">Smartphones</MenuItem>
                    <MenuItem value="laptops">Laptops</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Search Products"
                value={searchQuerry}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                }}

            />
            <Grid container spacing={3}>
                {productsList.map((product) => (
                    <Grid
                        key={product.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >

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
                                    sx={{
                                        objectFit: 'contain',
                                        p: 2
                                    }}
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

                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={Math.ceil(total / limit)}
                page={page}
                onChange={(event, value) => setPage(value)}
                sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
            />
        </>
    );
};

export default ProductDashBoard;
