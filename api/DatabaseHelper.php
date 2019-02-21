<?php

require 'Configurator.php';

class DatabaseHelper
{
  protected $connection;

  public function connect()
  {
    $config = Configurator::getConfig();

    try {

      $dsn = "mysql:host=" . $config['servername'] . ";dbname=" . $config['dbname'];
      $this->connection = new PDO($dsn, $config['username'], $config['password'], $config['options']);

      return $this->connection;

    } catch (Exception $e) {

      echo "Connection failed: " . $e->getMessage();

    }
  }
}
