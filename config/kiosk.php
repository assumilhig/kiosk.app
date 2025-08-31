<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Kiosk Configuration
    |--------------------------------------------------------------------------
    |
    | This file is for storing the configuration settings for the kiosk
    | application, such as the queue prefix used in generating reference numbers.
    |
    */

    'register_no' => env('KIOSK_REG_NO', '1'),
    'prefix' => env('KIOSK_PREFIX', 'A'),

];
