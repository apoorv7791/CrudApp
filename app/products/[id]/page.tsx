import Link from 'next/link';
import ProductImageCarousel from '@/components/ProductImageCarousel';

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
            <Link href={'/products'}>Go Back</Link>
        </>

    )
}


export default SingleProducts;