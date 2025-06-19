
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import React from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: '/products/create',
    },
];

export default function Index() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        stock: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'))
    }



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className='m-4 w-8/12 p-4'>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    {/* Display errors */}

                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert/>
                            <AlertTitle>¡Alerta!</AlertTitle>
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
                    <Button type='submit' className='my-4'>Create New Product</Button>
                </form>
                <div className='my-6'>
                    <Link href={route('products.index')}><Button> Return to Index </Button></Link>
                </div>
            </div>
        </AppLayout>
    );
}
