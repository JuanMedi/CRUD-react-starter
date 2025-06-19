import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CircleCheck } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number

}

interface PageProps {
    flash: {
        message?: string
    }
    products: Product[]
}

export default function Index() {

    const { products, flash } = (usePage().props as unknown as PageProps);

    const { processing, delete: destroy } = useForm();

    const totalStock = products.reduce((acc, product) => acc + product.stock, 0);


    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a product - ${id}. ${name}`)) {
            destroy(route('products.destroy', id))
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
                <Link href={route('products.create')}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow">
                        + Create Product
                    </Button>
                </Link>

            </div>
            <div className='m-4'>
                <div>
                    {flash.message && (
                        <Alert>
                            <CircleCheck />
                            <AlertTitle>Notification</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            {products.length > 0 && (
                <div className='m-4'>
                    <Table className="w-full border-collapse rounded-lg overflow-hidden shadow divide-y divide-gray-700">
                        <TableHeader className="bg-gray-800 text-white">
                            <TableRow>
                                <TableHead className="text-left px-6 py-3">Name</TableHead>
                                <TableHead className="text-left px-6 py-3">Description</TableHead>
                                <TableHead className="text-left px-6 py-3">Price</TableHead>
                                <TableHead className="text-left px-6 py-3">Stock</TableHead>
                                <TableHead className="text-center px-6 py-3">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-gray-900 text-white">
                            {products.map((product, index) => (
                                <TableRow key={product.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                                    <TableCell className="px-6 py-4">{product.name}</TableCell>
                                    <TableCell className="px-6 py-4">{product.description}</TableCell>
                                    <TableCell className="px-6 py-4">{product.price}</TableCell>
                                    <TableCell className="px-6 py-4">{product.stock}</TableCell>
                                    <TableCell className="px-6 py-4 flex justify-center gap-2">
                                        <Link href={route('products.edit', product.id)}>
                                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4">Edit</Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            onClick={() => handleDelete(product.id, product.name)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {products.length > 0 && (
                        <div className='m-4'>
                            <div className="text-white text-right font-semibold mb-2">
                                Total Stock: {totalStock}
                            </div>
                            <Table className="w-full border-collapse rounded-lg overflow-hidden shadow divide-y divide-gray-700">
                                {/* ... */}
                            </Table>
                        </div>
                    )}

                </div>
            )}
        </AppLayout>
    );
}
