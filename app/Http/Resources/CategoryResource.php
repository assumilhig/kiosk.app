<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class CategoryResource extends JsonResource
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
            'name' => trim($this->Name),
            'inactive' => $this->Inactive,
            'order_no' => $this->OrderNo,
            'required' => $this->required ?? false,
            'prev_id' => $this->prev_id ?? null,
            'next_id' => $this->next_id ?? null,
            'items' => ItemResource::collection($this->whenLoaded('items')),
            'descriptions' => KioskCategoryDescriptionResource::collection($this->whenLoaded('descriptions')),
            'notes' => KioskCategoryNoteResource::collection($this->whenLoaded('notes')),
        ];
    }
}
