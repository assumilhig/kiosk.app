<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class Item extends Model
{
    public $timestamps = false;

    protected $table = 'item';

    protected $fillable = [
        'ID',
        'ItemLookupCode',
        'Description',
        'ExtendedDescription',
        'DepartmentID',
        'CategoryID',
        'SubCategoryID',
        'MessageID',
        'Price',
        'ItemStatus',
        'Taxable',
        'Inactive',
        'OrderNo',
    ];

    protected function casts(): array
    {
        return [
            'ID' => 'integer',
            'CategoryID' => 'integer',
            'DepartmentID' => 'integer',
            'SubCategoryID' => 'integer',
            'MessageID' => 'integer',
            'Price' => 'float',
            'Inactive' => 'boolean',
            'Taxable' => 'boolean',
            'OrderNo' => 'integer',
        ];
    }
}
