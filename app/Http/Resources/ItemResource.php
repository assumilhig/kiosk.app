<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->ID,
            'itemcode' => $this->ItemLookupCode,
            'description' => trim($this->Description),
            'extended_description' => trim($this->ExtendedDescription),
            'department_id' => $this->DepartmentID,
            'category_id' => $this->CategoryID,
            'subcategory_id' => $this->SubCategoryID,
            'message_id' => $this->MessageID,
            'price' => $this->Price,
            'item_status' => $this->ItemStatus,
            'taxable' => $this->Taxable,
            'inactive' => $this->Inactive,
            'order_no' => $this->OrderNo,
        ];
    }
}
