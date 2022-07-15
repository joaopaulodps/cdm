<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'full_name',
        'foundation',
        'stadium',
        'city',
        'details_history',
        'flag',
        'country',
        'trophies',
        'regional_federation',
        'slug'
    ];

    public function country()
    {
        return $this->belongsTo('App\Models\Country');
    }

    public function regional()
    {
        return $this->belongsTo('App\Models\RegionalFederation');
    }

    public function trophies()
    {
        return $this->hasMany('App\Models\TeamTitle');
    }
}
