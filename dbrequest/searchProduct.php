<?php
/**
 * Created by PhpStorm.
 * User: jessica
 * Date: 27/05/2018
 * Time: 7:18 PM
 */
require_once ("../autoload.php");
SessionManager::start();

if(isset($_POST["name"])) {
    $bll = new BLL\ProductBLL();
    echo json_encode($bll->searchProducts($_POST["name"]));
//    echo $bll->searchProducts($_POST["name"])[0]["category"];
}
else {
    header("HTTP/1.1 500 error");
}