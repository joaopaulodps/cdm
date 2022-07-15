<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable= ['category_id', 'post_id', 'slug'];

    function category(){
        return $this->belongsTo('App\Models\PostCategory');
    }
}
