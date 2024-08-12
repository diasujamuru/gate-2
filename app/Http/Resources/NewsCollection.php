<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class NewsCollection extends ResourceCollection {
    public function toArray(Request $request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}