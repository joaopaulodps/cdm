<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NationalTeamTrophy extends Model
{
    use HasFactory;
    protected $fillable = [
        'competition',
        'name',
        'level',
        'details_history',
        'image',
        'slug'
    ];

    public function titles()
    {
        return $this->hasMany('App\Models\NationTitle');
    }
}
