
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';

const ProductDashBoard = () => {

    const products = [
        {
            id: 1,
            title: 'Essence Mascara Lash Princess',
            price: 9.99,
            image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp'
        },
        {
            id: 2,
            title: 'Eyeshadow Palette with Mirror',
            price: 19.99,
            image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp'
        },
        {
            id: 3,
            title: 'Powder Canister',
            price: 14.99,
            image: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp'
        },
        {
            id: 4,
            title: 'Red Lipstick',
            price: 12.99,
            image: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp'
        },
        {
            id: 5,
            title: 'Red Nail Polish',
            price: 8.99,
            image: 'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp'
        },
        {
            id: 6,
            title: 'Calvin Klein CK One',
            price: 49.99,
            images: [
                'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp',
                "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
                "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp",
            ]
        }
    ];

    return (
        <>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Products Listing
            </Typography>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid
                        key={product.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <Card sx={{ height: '100%' }}>

                            <CardMedia
                                component="img"
                                height="180"
                                image={product.images?.[0] ?? product.image}
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
                            </CardContent>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ProductDashBoard;
