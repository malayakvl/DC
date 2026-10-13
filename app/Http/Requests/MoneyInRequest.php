<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MoneyInRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'document_number' => ['required', 'string', 'max:255'],
            'document_date' => ['required', 'date'],
            'account_id' => ['required'],
            'amount' => ['required', 'numeric'],
            'status' => ['required'],
            'currency_id' => ['required'],
            'customer_id' => ['required'],
        ];
    }
}
