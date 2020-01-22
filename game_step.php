<?php

    //DBへの接続
    require('php/db_connect.php');

    if(ISSET($_POST["step"])){
        //当ステップのゲームデータを取得
        $step = $_POST["step"];
        $step_query = "SELECT * FROM galea_game WHERE step = '$step'";
        $step_result = $db->query($step_query);

        if($step_query){
            $game_data = [];
            foreach($step_result as $key=>$value){
                $game_data[$key]["cp_text"] = $value["cp_text"];
                $game_data[$key]["me_answer_a"] = $value["me_answer_a"];
                $game_data[$key]["me_answer_b"] = $value["me_answer_b"];
                $game_data[$key]["point"] = $value["point"];
                $game_data[$key]["view"] = $value["view"];
            }
            echo json_encode($game_data);
        }else{
            $backData = "no";
            echo json_encode($backData);
        }
    }

?>