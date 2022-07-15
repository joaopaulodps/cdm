<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamTitle extends Model
{
    use HasFactory;
    protected $fillable = [
        'team_id',
        'trophy_id',
        'seasons',
    ];

    public function team()
    {
        return $this->belongsTo('App\Models\Team');
    }

    public function trophy()
    {
        return $this->belongsTo('App\Models\TeamTrophy');
    }
}
