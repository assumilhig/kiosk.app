<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Common\DataResult;
use App\Http\Controllers\Controller;
use App\Models\KioskTransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

final class ReferenceNoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $result = new DataResult();

        $registerNo = config('kiosk.register_no');
        $prefix = config('kiosk.prefix');

        $latestRef = KioskTransactionItem::query()
            ->where('KioskRegNo', $registerNo)
            ->orderByDesc('ReferenceNo')
            ->value('ReferenceNo');

        $latestRef = Str::replace($prefix, '', $latestRef);

        if ($latestRef) {
            $numberPart = (int) mb_substr($latestRef, 1);
            $nextNumber = $numberPart + 1;
        } else {
            $nextNumber = 1;
        }

        $referenceNo = $prefix.str_pad($nextNumber, 7, '0', STR_PAD_LEFT);
        $result->data = [
            'reference_no' => $referenceNo,
        ];
        $result->message = 'Reference number generated successfully.';
        $result->success = true;

        return response()->json($result);
    }
}
