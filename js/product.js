function searchItemIndex() {
    var key = document.getElementById("search").value;
    if(key.length===0) return false;
    else window.location.href = "main.php?keyword="+key+"&searchby=name";
}

function searchItemMain() {
    var key = document.getElementById("search").value;
    if(key.length===0) return false;
    else {
        var e = document.getElementById("choice");
        var type = e.options[e.selectedIndex].value;
        console.log(type);
        var searchby;
        if (type === '3') searchby = "cate";
        else searchby = "name";
        window.location.href = "main.php?keyword="+key+"&searchby="+searchby;
    }
}

function showProduct(products) {
    var list = "";
    for (var i=0; i<products.length; i++){
        list += '<div class="col-md-4" style="background:#eee; "><div class="row"><div class="col-md-6 col-xs-6" >';
         list += '<img  style="height: 100%; width:100%;" src="'+products[i]["image"]+'" ></div>';        
         list += '<div class="col-md-6 col-xs-6"align="left" >';   
         list += '<div class="row" style=" white-space: nowrap; overflow: hidden;text-overflow: ellipsis; " ><lable>'+products[i]["name"]+'</lable></div>';
         list += '<div class="row" style="height: 100%; width:100%;"><lable>商品描述 : </lable>'+products[i]["description"]+'</div>';
         list += '<div class="row" > <h4>售價<lable>'+products[i]["price"]+'</lable></h4></div>';        
         list += '<div class="row" align="bottom"> ' +
            '<div class="btn-group" >'+
            '<button type="button" class="btn " style="background-color:#CCBBFF" onclick="viewProduct('+products[i]["PID"]+')">瀏覽</button>' +
            '<button type="button" class="btn " style="background-color:#FFD4D4" onclick="addToShoppingCart('+products[i]["PID"]+')">加入購物車</button>';
         list += '</div> </div> </div></div></div></div>';
    }
    return list;
}

function showItems(keyword, cate) {
    var products = findItem(keyword, cate);
    return showProduct(products);
}

function chooseType()
{
    var type = document.getElementById("choice");
    console.log(type.options[type.selectedIndex].text);
}

function viewProduct(pid)
{
    window.location.href = "caption.php?PID="+pid;
}

function viewProductInfo(pid)
{
    var product = findProduct(pid);
    var list = "";
    list += '<div class="row" style="background:#eee;height: 350px; width:auto;"><div class="col-md-4 col-xs-4">';
    list += '<img src="'+product["image"]+'" alt="..." class="img-thumbnail" style="height: 100%; width:100%;"></div>';
    list += '<form  action="" name="InfoForm" method="post" onsubmit="return false;">';
    list += '<div class="col-md-8 col-xs-8"> <div class="row-md-3 row-xs-3" >';
    list += '<h4>商品名稱'+product["name"]+'</h4></div>';
    list += '<div class="row-md-8 row-xs-8" >';
    list += '<h4 >商品介紹'+product["description"]+'</h4>';  
    list += '</div></div></div>';
    list += '<div class="row" style="width:auto;background:#eee">';
    list += '<div class="col-md-4 col-xs-4">';
    list += '<h4>價格  :  '+product["price"]+'</h4></div>';
    list += '<div class="col-md-4 col-xs-4">';
    list += '<h4>剩餘數量  :  '+'剩餘數量'+'</h4></div>';
    list += '<div class="col-md-4 col-xs-4">';
    list += '<h4>類別  :  '+product["category"]+'</h4></div>';
    list += '<div class="btn-group" ><br>';
    list += '<button class="btn " style="background-color:#CCBBFF"> 購買 </button>';
    list += '<button style="background-color:#FFD4D4" class="btn "> 加入購物車 </button></div></form></div></div></div>';
    document.getElementById("product").innerHTML+= list;
}



function listAllCategory()
{
    var categories = findAllCategory();
    var list = "";
    for (var i=0; i<categories.length; i++)
    {
        list += '<li><a href="main.php?keyword='+categories[i]["category"]+'&searchby=cate">'+categories[i]["category"]+'</a></li>&nbsp;&nbsp;&nbsp;';
    }
    return list;

}



function showPersonalItems()
{
    var products = findPersonalProduct();
    return showProduct(products);
}


function addToShoppingCart(pid)
{
    var http = new XMLHttpRequest();
    var products = "";
    http.open("POST", "./dbrequest/addToShoppingCart.php", false);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange=function() {
        if(this.readyState === 4 && this.status === 200) {
            products = http.responseText;
        }
    };
    http.send("PID="+pid+"&amount=1");
}


var header = ["商品", "單價", "庫存","數量", "價格", "取消購買"];
var headerclass = ["detail", "price", "stock", "amount"];
function showShoppingCart()
{
    var colnum = header.length;
    var productslist = getPersonalShoppingList(0);
    var list='<tr>';
    list+= '</tr>';
    for (var i = 0; i < colnum; i++) {
        list += '<td>';
        list += header[i];
        list += '</td>';
    }
    var totalcost = 0;
    for (i = 0;i < productslist.length; i++) {
        var product = findProduct(productslist[i]["PID"]);
        if (i%2 === 0) {
            list += '<tr style="background-color: #f9f2f4">';
        }
        else list += '<tr style="background-color: #FFE5FF">';

        for(var j = 0; j < colnum; j++)
        {
            switch(j){
                case 0:
                    list += '<td class=>';
                    list += product["name"];
                    break;
                case 1:
                    list += '<td class=>';
                    list += product["price"];
                    break;
                case 2:
                    list += '<td class=>';
                    list += product["amount"];
                    break;
                case 3:
                    list += '<td class=>';
                    list += '<select id="amount_'+i.toString()+'" onchange="updateAmount('+product["PID"]+','+i+'); window.location.reload();">';
                    list += '<option value=\"0\">'+productslist[i]["amount"]+'</option>' +
                        '<option value=\"1\">1</option>' +
                        '<option value=\"2\">2</option>' +
                        '<option value=\"3\">3</option>' +
                        '<option value=\"4\">4</option>' +
                        '<option value=\"5\">5</option>' +
                        '</select>';
                    break;
                case 4:
                    list += '<td class="smallTotal">';
                    list += (product["price"] * productslist[i]["amount"]).toString();
                    totalcost += product["price"] * productslist[i]["amount"];
                    break;
                case 5:
                    list += '<td class="trash">';
                    list += '<input class="trashButton" type="image" onclick="removeProduct('+product["PID"]+'); window.location.reload();" img src="./resource/trash.png">';
                    break;
                default:
                    break;
            }
            list += '</td>';
        }
        list += '</tr>';
    }
    list += '<tr><td colspan="'+colnum+'" style="text-align:right; padding-right: 2em;"><label>Total Price：</label>'+totalcost.toString()+'</td></tr>';
    list += '<tr id="decisionRow"><td colspan="'+colnum+'" style="background-color: #f9f2f4; align-content: right;">' +
        '<input class="button" type="submit" name=""  onclick="location.href=\'index.php\'" value="繼續購物" >' +
        '<input class="button" type="submit" name="" onclick="location.href=\'#.html\'" value="結帳">' +
        '</td></tr>';
    return list;

}

function updateAmount(pid, i) {
    var id = "amount_"+i.toString();
    var e = document.getElementById(id);
    var amount = e.options[e.selectedIndex].value;
    e.options[e.options.selectedIndex].selected = true;
    console.log(amount);
    updateShopAmount(pid, amount);
}



function getShoppingCartLength()
{
    var productslist = getPersonalShoppingList(0);
    if(productslist.length>0) {
        document.getElementById("cart").innerHTML += ' ('+productslist.length+')';
    }
}