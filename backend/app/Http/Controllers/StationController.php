<?php

namespace App\Http\Controllers;

use App\Models\Station;
use Illuminate\Http\Request;

class StationController extends Controller
{
    // GET /api/stations
    // Return every station, newest first
    public function index()
    {
        return response()->json(
            Station::latest()->get()
        );
    }

    // GET /api/stations/{station}
    // Return one station using Laravel route-model binding
    public function show(Station $station)
    {
        return response()->json($station);
    }

    // POST /api/stations
    // Validate and save a new station in the database
    public function store(Request $request)
    {
        $validated = $request->validate([
            'station_name' => 'required|string|max:100',
            'category' => 'required|string|max:100',
            'hourly_rate' => 'required|numeric|min:0',
        ]);

        $station = Station::create($validated);

        return response()->json($station, 201);
    }
}