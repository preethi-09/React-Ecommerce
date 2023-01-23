<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('site_infos', function (Blueprint $table) {
            $table->id();
            $table->text('about',50000);
            $table->text('refund',50000);
            $table->text('purchase_guide',50000);
            $table->text('privacy',50000);
            $table->text('address',50000);
            $table->text('android_app_link',50000);
            $table->text('ios_app_link',50000);
            $table->text('facebook',50000);
            $table->text('instagram',50000);
            $table->text('copyright',50000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('site_infos');
    }
};
