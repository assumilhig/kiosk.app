<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class KioskTransactionItem extends Model
{
    public $timestamps = false;

    protected $table = 'kiosk_transactionitem';

    protected $fillable = [
        'KioskRegNo',
        'ReferenceNo',
        'ItemLookupCode',
        'Description',
        'Quantity',
        'UnitPriceSold',
        'ExtendedAmt',
        'OriginalPrice',
        'OriginalExtendedAmt',
        'DiscountCode',
        'LineDiscount',
        'Taxable',
        'DateTime',
        'TransactionNumber',
        'RegisterNo',
    ];
}
