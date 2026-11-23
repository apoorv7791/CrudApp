import Link from 'next/link';
import ProductImageCarousel from '@/components/ProductImageCarousel';

import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    Button,
    Divider,
    Chip,
    Stack
} from '@mui/material';

interface SingleProductsProps {
    params: Promise<{
        id: string;
    }>;
}

const SingleProducts = async ({ params }: SingleProductsProps) => {

    const { id } = await params;

    // Fetch product using its dynamic ID
    const response = await fetch(
        `https://dummyjson.com/products/${id}`
    );

    if (!response.ok) {
        throw new Error(`Unable to view product ID: ${id}`);
    }

    const result = await response.json();

    return (
        <Container
            maxWidth="lg"
            sx={{ py: { xs: 3, md: 5 } }}
        >

            <Typography
                variant="h4"
                sx={{
                    mb: 4,
                    fontWeight: 'bold'
                }}
            >
                Product Details
            </Typography>

            <Card elevation={3}>
                <CardContent
                    sx={{ p: { xs: 2, md: 4 } }}
                >

                    <Grid container spacing={4}>

                        {/* Product Images */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    minHeight: 300,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <ProductImageCarousel
                                    images={result.images ?? []}
                                />
                            </Box>
                        </Grid>

                        {/* Product Information */}
                        <Grid size={{ xs: 12, md: 7 }}>

                            <Stack spacing={2}>

                                <Chip
                                    label={result.category}
                                    color="primary"
                                    sx={{
                                        alignSelf: 'flex-start'
                                    }}
                                />

                                <Typography
                                    variant="h4"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {result.title}
                                </Typography>

                                <Typography
                                    variant="h5"
                                    color="primary"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    ${result.price}
                                </Typography>

                                <Divider />

                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    {result.description}
                                </Typography>

                                <Divider />

                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 4,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Product Specifications
                                </Typography>

                                <Stack spacing={1.5}>

                                    <Typography>
                                        <strong>Brand:</strong>{' '}
                                        {result.brand || 'N/A'}
                                    </Typography>

                                    <Typography>
                                        <strong>Stock:</strong>{' '}
                                        {result.stock}
                                    </Typography>

                                    <Typography>
                                        <strong>SKU:</strong>{' '}
                                        {result.sku}
                                    </Typography>

                                    <Typography>
                                        <strong>Weight:</strong>{' '}
                                        {result.weight}
                                    </Typography>

                                    <Typography>
                                        <strong>Warranty:</strong>{' '}
                                        {result.warrantyInformation}
                                    </Typography>

                                    <Typography>
                                        <strong>Shipping:</strong>{' '}
                                        {result.shippingInformation}
                                    </Typography>

                                    <Typography>
                                        <strong>Availability:</strong>{' '}
                                        {result.availabilityStatus}
                                    </Typography>

                                    <Typography>
                                        <strong>Minimum Order Quantity:</strong>{' '}
                                        {result.minimumOrderQuantity}
                                    </Typography>

                                </Stack>

                            </Stack>

                        </Grid>

                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Link
                        href="/products"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button variant="contained">
                            Back to Products
                        </Button>
                    </Link>

                </CardContent>
            </Card>

        </Container>
    );
};

export default SingleProducts;