<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return Inertia::render('Products/Index', compact('products'));
    }

    public function create(){
        return Inertia::render('Products/Create');
    }

    public function edit(Product $product){
        return Inertia::render('Products/Edit', compact('product'));
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer'
        ]);

        Product::create($request->all());
        return redirect()->route('products.index')->with('message', 'Product Created Succesfully');

    }

    public function destroy(Product $product){
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Product Deleted Succesfully');

    }

    public function update(Request $request, Product $product){
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer'
        ]);

        $product->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
        ]);

        return redirect()->route('products.index')->with('message', 'Product Edited Succesfully');

    }
}
