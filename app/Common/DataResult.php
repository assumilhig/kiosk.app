<?php

declare(strict_types=1);

namespace App\Common;

final class DataResult
{
    public $message = '';

    public $data = [];

    public $success = false;

    public function Iterate()
    {
        if (is_array($this->message)) {
            $message = '';
            foreach ($this->message as $key) {
                if ($message !== '') {
                    $message .= ',';
                }
                $message .= $key;
            }

            $this->message = $message;
        }

        return $this;
    }
}
