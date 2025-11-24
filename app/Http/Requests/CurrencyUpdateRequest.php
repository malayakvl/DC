<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CurrencyUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id'     => ['required', 'integer'],
            'name'   => ['required', 'string'],
            'symbol' => ['nullable', 'string'],
            'rate'   => ['required', 'numeric'],
        ];
    }
}
