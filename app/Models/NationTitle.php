<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NationTitle extends Model
{
    use HasFactory;
    protected $fillable = [
        'nation_id',
        'trophy_id',
        'seasons'
    ];

    public function nation()
    {
        return $this->belongsTo('App\Models\NationalTeam');
    }

    public function trophy()
    {
        return $this->belongsTo('App\Models\NationalTeamTrophy');
    }
}
