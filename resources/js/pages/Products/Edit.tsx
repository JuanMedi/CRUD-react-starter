
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import React from 'react';

interface Product{
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number
}

interface Props{
    product:Product
}

export default function Edit({product}:Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: String(product.price),
        stock: String(product.stock)
    })

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id))
    }



    return (
        <AppLayout breadcrumbs={[{title: 'Edit a Product', href:`products/${product.id}/edit`}]}>
            <Head title="Update Product" />
            <div className='m-4 w-8/12 p-4'>
                <form onSubmit={handleUpdate} className='space-y-5'>
                    {/* Display errors */}

                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert/>
                            <AlertTitle>¡Warning!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) =>(
                                        <li key = {key} > {message as string} </li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className='gap-1.5'>
                        <Label htmlFor='product-name'>Name</Label>
                        <Input placeholder='Product name' value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='product-description'>Descripcion</Label>
                        <Textarea placeholder='Product Description' value={data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='product-price'>Price</Label>
                        <Input placeholder='Product price' value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='product-stock'>Stock</Label>
                        <Input placeholder='Product stock' value={data.stock} onChange={(e) => setData('stock', e.target.value)}></Input>
                    </div>
                    <Button disabled={processing} type='submit' className='my-4'>Update Product</Button>
                </form>
                <div className='my-6'>
                    <Link href={route('products.index')}><Button> Return to Index </Button></Link>
                </div>
            </div>
        </AppLayout>
    );
}
