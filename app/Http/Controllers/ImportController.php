<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ImportController extends Controller
{
    //
    function __construct()
    {
    }


    public function index(Request $request) {
        if ($request->user()->can('import')) {
            return Inertia::render('Import/Index', [
            ]);
        } else {
            return Inertia::render('Layout/NoPermission', []);
        }
    }
}
