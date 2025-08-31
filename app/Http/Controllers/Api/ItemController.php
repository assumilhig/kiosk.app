<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

final class ItemController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $categories = Category::query()
            ->with('items', 'descriptions', 'notes')
            ->where('inactive', false)
            ->where('orderno', '<>', 0)
            ->whereHas('items')
            ->orderBy('orderno')
            ->get();

        $categories->transform(function ($category, $index) use ($categories) {
            $category->prev_id = $index > 0 ? $categories[$index - 1]->ID : null;
            $category->required = $category->prev_id ? false : true;
            $category->next_id = $index < $categories->count() - 1 ? $categories[$index + 1]->ID : null;

            return $category;
        });

        return response()->json(CategoryResource::collection($categories));
    }
}
