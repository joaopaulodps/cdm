<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    protected $fillable = ['name',
                           'federal_capital',
                           'population',
                           'continent',
                           'coin',
                           'official_language',
                           'iso',
                           'details_history',
                           'flag',
                           'continent_id',
                           'top_country',
                           'slug'
                        ];

    public function continents()
    {
        return $this->belongsToOne('\App\Models\ContinentalFederation');
    }

    public function nationalTeams()
    {
        return $this->hasOne('\App\Models\NationalTeam');
    }

    public function regionals()
    {
        return $this->hasMany('\App\Models\RegionalFederation');
    }

    public function teams()
    {
        return $this->hasMany('App\Models\Teams');
    }
}
