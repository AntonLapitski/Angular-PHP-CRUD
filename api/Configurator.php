<?php

class Configurator
{
  public static function getConfig()
  {
    return require __DIR__ . '/config.php';
  }
}
