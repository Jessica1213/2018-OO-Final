<?php
/**
 * Created by PhpStorm.
 * User: jessica
 * Date: 2018/6/7
 * Time: 5:36 PM
 */
require_once ("../autoload.php");
SessionManager::start();
require_once ("../checkLogin.php");

if(isset($_POST["paid"])) {
    $bll = new BLL\ProductBLL();
    echo json_encode($bll->getShoppingCart(SessionManager::get("UID"), (int)$_POST["paid"]));
}
else {
    header("HTTP/1.1 500 error");
}