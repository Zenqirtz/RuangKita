<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Permit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'user_id',
        'event',
        'ormawa',
        'pic',
        'phone',
        'room_id',
        'room_name',
        'date',
        'start',
        'end',
        'participants',
        'notes',
        'proposal_name',
        'letter_name',
        'stage',
        'admin_notes',
        'submitted_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date' => 'date',
            'submitted_at' => 'datetime',
            'participants' => 'integer',
            'room_id' => 'integer',
        ];
    }

    /**
     * Get the user who created this permit.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get histories / audit trail.
     */
    public function histories(): HasMany
    {
        return $this->hasMany(PermitHistory::class)->latest();
    }
}
