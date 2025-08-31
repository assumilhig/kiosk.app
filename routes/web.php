<?php

declare(strict_types=1);

use App\Http\Controllers\Api\AddToCartController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\ReferenceNoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('kiosk');
})->name('home');

Route::get('tablet', function () {
    return Inertia::render('tablet');
})->name('tablet');

Route::group(['prefix' => 'api'], function () {
    Route::get('get_reference_no', ReferenceNoController::class)->name('api.reference_no');
    Route::get('items', ItemController::class)->name('api.items');

    Route::post('add_to_cart', AddToCartController::class)->name('api.add_to_cart');
});
