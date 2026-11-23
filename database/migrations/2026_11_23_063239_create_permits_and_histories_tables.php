<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permits', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('event');
            $table->string('ormawa');
            $table->string('pic');
            $table->string('phone')->nullable();
            $table->unsignedBigInteger('room_id')->default(1);
            $table->string('room_name');
            $table->date('date');
            $table->string('start', 10);
            $table->string('end', 10);
            $table->unsignedInteger('participants')->default(1);
            $table->text('notes')->nullable();
            $table->string('proposal_name')->nullable();
            $table->string('letter_name')->nullable();
            $table->enum('stage', ['submitted', 'admin', 'leadership', 'approved', 'revision', 'rejected'])->default('submitted');
            $table->text('admin_notes')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
        });

        Schema::create('permit_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('permit_id')->constrained('permits')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('actor_name')->default('Admin');
            $table->string('from_stage')->nullable();
            $table->string('to_stage');
            $table->string('action'); // submitted, verified, revision_requested, approved, rejected
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permit_histories');
        Schema::dropIfExists('permits');
    }
};
