<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorldFederation extends Model
{
    use HasFactory;
    protected $fillable = [ 
        'name',
        'full_name',
        'foundation',
        'head_office',
        'details_history',
        'flag',
        'slug'
    ];

    public function continents()
    {
        return $this->hasMany('\App\Models\ContinentalFederation');
    }
    public function nations()
    {
        return $this->hasOne('\App\Models\NationalTeam');
    }
}
