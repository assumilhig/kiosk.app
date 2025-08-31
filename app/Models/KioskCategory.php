<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class KioskCategory extends Model
{
    public $timestamps = false;

    protected $table = 'kiosk_category';

    protected $fillable = [
        'CategoryID',
        'Description',
        'Notes',
        'OrderNo',
    ];

    protected function casts(): array
    {
        return [
            'CategoryID' => 'integer',
            'OrderNo' => 'integer',
        ];
    }
}
