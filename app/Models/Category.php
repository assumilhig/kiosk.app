<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class Category extends Model
{
    public $timestamps = false;

    protected $table = 'category';

    protected $fillable = [
        'ID',
        'DepartmentID',
        'Name',
        'Inactive',
        'OrderNo',
    ];

    public function items()
    {
        return $this->hasMany(Item::class, 'CategoryID', 'ID')
            ->where('Inactive', false)
            ->where('ItemStatus', 'Regular Item')
            ->orderBy('OrderNo');
    }

    public function descriptions()
    {
        return $this->hasMany(KioskCategory::class, 'CategoryID', 'ID')
            ->where('Description', '<>', '')
            ->orderBy('OrderNo');
    }

    public function notes()
    {
        return $this->hasMany(KioskCategory::class, 'CategoryID', 'ID')
            ->where('Notes', '<>', '')
            ->orderBy('OrderNo');
    }

    protected function casts(): array
    {
        return [
            'Inactive' => 'boolean',
            'OrderNo' => 'integer',
            'ID' => 'integer',
        ];
    }
}
