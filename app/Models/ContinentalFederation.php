<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContinentalFederation extends Model
{
    use HasFactory;
    protected $fillable = ['name',
                           'full_name',
                           'foundation',
                           'continent',
                           'details_history',
                           'flag',
                           'world_federation_id',
                           'slug'
    ];

    public function world()
    {
        return $this->belongsTo('\App\Models\WorldFederation');
    }

    public function countries()
    {
        return $this->hasMany('\App\Models\Countries');
    }
}
