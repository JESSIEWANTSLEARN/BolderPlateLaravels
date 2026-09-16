<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // Create the stations table
    public function up(): void
    {
        Schema::create('stations', function (Blueprint $table) {
            $table->id();
            $table->string('station_name');
            $table->string('category');
            $table->decimal('hourly_rate', 10, 2);
            $table->timestamps();
        });
    }

    // Remove the table if this migration is rolled back
    public function down(): void
    {
        Schema::dropIfExists('stations');
    }
};