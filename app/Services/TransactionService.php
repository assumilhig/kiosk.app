<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;

final class TransactionService
{
    /**
     * Compute totals for kiosk transactions.
     *
     * @param  string|int  $kioskRegNo
     * @param  string  $referenceNo
     */
    public function computeTotals($kioskRegNo, $referenceNo): array
    {
        $totals = [];

        // 🔹 Call stored procedure: Proc_RecomputeRegister_Kiosk
        DB::statement('EXEC Proc_RecomputeRegister_Kiosk :kioskRegNo, :referenceNo', [
            'kioskRegNo' => $kioskRegNo,
            'referenceNo' => $referenceNo,
        ]);

        // 🔹 Compute totals from KIOSK_TransactionItem
        $register = DB::selectOne('
            SELECT
                ISNULL(SUM(ExtendedAmt), 0) AS total,
                ISNULL(SUM(LineDiscount), 0) AS discount,
                ISNULL(SUM(OriginalPrice * Quantity), 0) AS gross
            FROM [KIOSK_TransactionItem]
            WHERE KioskRegNo = :kioskRegNo
              AND ReferenceNo = :referenceNo
        ', [
            'kioskRegNo' => $kioskRegNo,
            'referenceNo' => $referenceNo,
        ]);

        $totals['total'] = (float) (round($register->total ?? 0, 2));
        $totals['subtotal'] = (float) (round($register->gross ?? 0, 2));
        $totals['discount'] = (float) (round($register->discount ?? 0, 1));

        // 🔹 Call stored procedure: Proc_ComputeServiceCharge_Kiosk
        DB::statement('EXEC Proc_ComputeServiceCharge_Kiosk :kioskRegNo, :referenceNo', [
            'kioskRegNo' => $kioskRegNo,
            'referenceNo' => $referenceNo,
        ]);

        // 🔹 Fetch service charge
        $serviceCharge = DB::selectOne('
            SELECT *
            FROM [RegisterServiceCharge_Kiosk]
            WHERE RegisterNo = :kioskRegNo
        ', [
            'kioskRegNo' => $kioskRegNo,
        ]);

        $totals['service_charge'] = (float) (round($serviceCharge->Amount ?? 0, 2));

        // 🔹 Add service charge to total
        $totals['total'] = (float) (round($totals['total'] + $totals['service_charge'], 2));

        return $totals;
    }
}
