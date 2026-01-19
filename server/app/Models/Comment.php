<?php

namespace App\Models;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{

    protected $appends = ['time'];
    protected $guarded = [];
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function getTimeAttribute()
    {
        return Carbon::parse($this->created_at)->diffForHumans();
    }


}
