<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <title>拼命買</title>
    <?php require_once ("head.php")?>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="imagetoolbar" content="no" />
    <script type="text/javascript" src="js/user.js"></script>
    <script type="text/javascript" src="js/product.js"></script>
</head>
<body>
<?php require_once ("navbar.php")?>
<div class="wrapper row4">
    <div  id="login">
        <form  action="index.php" name="loginForm" >
            <table>
                <tr>
                    <td><input class="customer" type="button" onclick="location.href='index.php'" value="我是顧客"></td>
                </tr>
                <tr>
                    <td><input class="Manager" type="button" onclick="location.href='#.html'" value="我是賣家"></td>
                </tr>
            </table>
        </form>
    </div>
</div>
</body>
</html>