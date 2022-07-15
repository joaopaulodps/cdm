<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NationalTeam extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'full_name',
        'federation_name',
        'foundation',
        'stadium',
        'details_history',
        'country_id',
        'world_federation_affiliation',
        'world_federation',
        'world_affiliation_date',
        'continental_federation_affiliation',
        'continental_federation',
        'continental_affiliation_date',
        'trophies',
        'flag',
        'slug'
    ];

    public function countries()
    {
        return $this->belongsToOne('App\Models\Country');
    }

    public function world()
    {
        return $this->belongsTo('\App\Models\WorldFederation');
    }

    public function trophies()
    {
        return $this->hasMany('App\Models\NationTitle');
    }
}
