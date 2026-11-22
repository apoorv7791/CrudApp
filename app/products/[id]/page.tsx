import Link from 'next/link';
import ProductImageCarousel from '@/components/ProductImageCarousel';
import { Button } from '@mui/material';
interface SingleProductsProps {
    params: Promise<{
        id: string;
    }>;
}

const SingleProducts = async ({ params }: SingleProductsProps) => {
    const { id } = await params;
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
        throw new Error(`Unable to view product ID: ${id}`);
    }

    const result = await response.json();

    console.log(result);

    return (
        <>
            <h1>Single Products: </h1>
            <ProductImageCarousel images={result.images ?? []} />
            <h2>Name: {result.title}</h2>
            <h2>Price: {result.price}</h2>
            <h2>Category: {result.category}</h2>
            <h1>Description: {result.description}</h1>

            <h2>Product Specifications</h2>

            <p>Brand: {result.brand}</p>
            <p>Stock: {result.stock}</p>
            <p>SKU: {result.sku}</p>
            <p>Weight: {result.weight}</p>
            <p>Warranty: {result.warrantyInformation}</p>
            <p>Shipping: {result.shippingInformation}</p>
            <p>Availability: {result.availabilityStatus}</p>
            <p>Minimum Order Quantity: {result.minimumOrderQuantity}</p>
            <Link href="/products" style={{ textDecoration: 'none' }}>
                <Button variant="contained">
                    Go Back
                </Button>
            </Link>
        </>

    )
}


export default SingleProducts;