<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    // These fields can be saved using Station::create()
    protected $fillable = [
        'station_name',
        'category',
        'hourly_rate',
    ];

    // Always treat hourly_rate as a decimal number
    protected $casts = [
        'hourly_rate' => 'decimal:2',
    ];
}