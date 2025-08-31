<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Common\DataResult;
use App\Http\Controllers\Controller;
use App\Models\KioskTransactionItem;
use App\Services\TransactionService;
use Illuminate\Http\Request;

final class AddToCartController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $result = new DataResult();

        $register_no = config('kiosk.register_no');

        $request->validate([
            'reference_no' => 'required|string',
            'cart' => 'required|array',
        ]);

        $reference_no = $request->input('reference_no');

        $cart = collect($request->input('cart'))->map(function ($cart) use ($register_no, $reference_no) {
            return [
                'KioskRegNo' => $register_no,
                'ReferenceNo' => $reference_no,
                'ItemLookupCode' => $cart['itemcode'],
                'Description' => $cart['description'],
                'Quantity' => $cart['quantity'],
                'UnitPriceSold' => $cart['price'],
                'ExtendedAmt' => $cart['total'],
                'OriginalPrice' => $cart['price'],
                'OriginalExtendedAmt' => $cart['total'],
                'DiscountCode' => '',
                'LineDiscount' => 0,
                'Taxable' => $cart['taxable'] ? 1 : 0,
                'DateTime' => now()->toDateTimeString(),
            ];
        })->toArray();

        KioskTransactionItem::where('KioskRegNo', $register_no)
            ->where('ReferenceNo', $reference_no)
            ->delete();

        KioskTransactionItem::insert($cart);

        $totals = (new TransactionService)->computeTotals($register_no, $reference_no);

        $result->data = [
            'totals' => $totals,
        ];
        $result->success = true;
        $result->message = 'Cart synchronized successfully.';

        return response()->json($result);
    }
}
