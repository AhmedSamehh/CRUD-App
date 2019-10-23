var searchInp = document.getElementById("searchInp");
var productNameInp = document.getElementById("productName");
var productPriceInp = document.getElementById("productPrice");
var productCompanyInp = document.getElementById("productCompany");
var productDescInp = document.getElementById("productDesc");

var modalNameInp = document.getElementById("modalName");
var modalPriceInp = document.getElementById("modalPrice");
var modalCompanyInp = document.getElementById("modalCompany");
var modalDescInp = document.getElementById("modalDesc");

var addBtn = document.getElementById("addBtn");
var updBtn = document.getElementById("updBtn");
var searchRow = document.getElementById("searchRow");
var alertContainer = document.getElementById("alertContainer");
var productsContainer ;
var currentIndex = 0;

if(localStorage.getItem("productsContainer") == null)
    {
        productsContainer = [];
    }
else
    {
        productsContainer =JSON.parse( localStorage.getItem("productsContainer"));
        displayData();
    }


searchInp.onkeyup = function()
{
    searchProducts(searchInp.value);
}
function searchProducts(item)
{
    var searchCols = "";
    for(var i=0;i<productsContainer.length;i++)
        {
            if(productsContainer[i].name.includes(item))
                {
                    searchCols +='<div class="col-md-3"> <div class="product"><h3>'+productsContainer[i].name+'</h3><p>'+productsContainer[i].desc+'</p><p class="text-danger">'+productsContainer[i].price+'</p> <p class="text-info">'+productsContainer[i].company+'</p><button class="btn btn-danger" onclick="deleteProduct('+i+')">Delete Item</button><button type="button" class="btn btn-primary ml-2" data-toggle="modal" data-target="#exampleModal" onclick="setForm('+i+')">Update item</button></div></div>' 
                }
            searchRow.innerHTML = searchCols;
        }
}

addBtn.onclick = function()
{
    if(validateForm()==true)
        {
            addProduct();
            displayData();
            clearForm();
        }
}

function addProduct()
{
    var product = 
        {
            name:productNameInp.value,
            price:productPriceInp.value,
            company:productCompanyInp.value,
            desc:productDescInp.value
        }
    productsContainer.push(product);
    
localStorage.setItem("productsContainer",JSON.stringify(productsContainer)); 
}

function displayData()
{
    var cols="";
    for(var i = 0 ; i<productsContainer.length ; i++)
        {
        cols +='<div class="col-md-3"> <div class="product"><h3>'+productsContainer[i].name+'</h3><p>'+productsContainer[i].desc+'</p><p class="text-danger">'+productsContainer[i].price+'</p> <p class="text-info">'+productsContainer[i].company+'</p><button class="btn btn-outline-danger" onclick="deleteProduct('+i+')">Delete Item</button><button type="button" class="btn btn-outline-primary ml-2" data-toggle="modal" data-target="#exampleModal" onclick="setForm('+i+')">Update item</button></div></div>'    
        }
    
        
    document.getElementById("rowData").innerHTML = cols;
}
function setForm(i)
{
    modalNameInp.value = productsContainer[i].name;
    modalCompanyInp.value = productsContainer[i].company;
    modalDescInp.value = productsContainer[i].desc;
    modalPriceInp.value = productsContainer[i].price;
    
    currentIndex = i;
}
function deleteProduct(id)
{
    
    productsContainer.splice(id,1);
localStorage.setItem("productsContainer",JSON.stringify(productsContainer));
    
    displayData();

}
updBtn.onclick = function()
{
    updateProduct();
    displayData();
    clearForm();
}
function updateProduct()
{
    productsContainer[currentIndex].name = modalNameInp.value; 
    productsContainer[currentIndex].company = modalCompanyInp.value;
    productsContainer[currentIndex].desc = modalDescInp.value ;
    productsContainer[currentIndex].price = modalPriceInp.value;
    localStorage.setItem("productsContainer",JSON.stringify(productsContainer));
}
function clearForm()
{
    
   var inputs= document.getElementsByClassName("form-control");
    
    for(var i= 0 ; i <inputs.length ; i++)
        {
            inputs[i].value = "";
        }
}

function validateForm()
{
    var errors = "";
    var nameRegx = /^[A-Z][a-zA-Z1-9]{2,10}$/;
    var priceRegx = /^[1-9][0-9]{3,5}$/;
    
    if(nameRegx.test(productNameInp.value)== false)
        {
            alertContainer.style.display = "block";
            errors+="<p>Product name must start with capital letter</p>";
            alertContainer.innerHTML = errors
        }
    if(priceRegx.test(productPriceInp.value)== false)
        {
            alertContainer.style.display = "block";
            errors+="<p>Product price must be between 100 and 10000</p>";
            alertContainer.innerHTML = errors
        }
    if(errors.length>0)
        {
            return false;
        }
    else 
        {
            alertContainer.style.display = "none";
            return true;
        }
}









