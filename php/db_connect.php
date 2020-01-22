<?php

    //require_once("db_acc_click.php");
    require_once("db_acc_local.php");
    
    try {  
        $db = new PDO('mysql:dbname='.DB_NAME.';host='.DB_HOST.';charset='.CHARSET, USERNAME, USERPASS);
	} catch(PDOException $e) {
		echo 'DB接続エラー:' . $e->getMessage();
    }

?>