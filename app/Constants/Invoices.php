<?php

namespace App\Constants;

class Invoices
{
    // Invoice statuses as array of objects
    public const INVOICE_STATUSES = [
        ['id' => 'draft', 'name' => 'Draft'],
        ['id' => 'posted', 'name' => 'Posted'],
        ['id' => 'canceled', 'name' => 'Canceled']
    ];
    
}