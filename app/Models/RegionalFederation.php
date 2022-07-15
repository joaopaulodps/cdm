<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegionalFederation extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'full_name',
        'foundation',
        'state',
        'details_history',
        'flag',
        'country_id',
        'slug'
    ];

    public function countries()
    {
        return $this->belongsTo('App\Models\Country');
    }

    public function teams()
    {
        return $this->hasMany('App\Models\Teams');
    }
}
