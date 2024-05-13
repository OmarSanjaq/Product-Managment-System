let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');

let CUmood='create'; // -> Create / Update mood
let TCmood='title';// ->Title / Category mood
let temp;



//get total
function getTotal()
{
    if(price.value != ''){
        let result = (((+price.value) + (+taxes.value) + (+ads.value)) - (+discount.value));
        total.innerHTML=result;
        total.style.background =  "#040";
    }else
    {
        total.innerHTML = '';
        total.style.background = "brown";
    }
}
//save local storage

let dataProduct;
if(localStorage.product !=null){
    dataProduct=JSON.parse(localStorage.product);
}else{
    dataProduct=[];
}
//create products
create.onclick = function(){
    let newProject = {
        title: title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads :ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' 
    && price.value !=''
    && category.value !=''
    && count.value < 100){
        if(CUmood === 'create'){
            if(newProject.count > 1){
                for(let i=0;i <newProject.count;i++){
                    dataProduct.push(newProject);
                }
            }else
            {
                dataProduct.push(newProject);
            }
        }else
        {
            dataProduct[temp]=newProject;
            CUmood = 'create';
            create.innerHTML='create';
            count.style.display='block';
        }
    clearInputs();
    }  else{
        openPopup()
    }  
    
    localStorage.setItem('product',JSON.stringify(dataProduct));
    console.log(newProject);

    showInfo();
}


//clear input
function clearInputs(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
//  cruds  = > read
function showInfo()
{
    getTotal();
    let table='';
    for(let i=0 ; i<dataProduct.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" onclick="updateProduct(${i})">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataProduct.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteData()">Delete All (${dataProduct.length})</button>
        `
    }else{
        btnDelete.innerHTML = ``;
    }
}
showInfo();

//delete product  //  all
function deleteProduct(i)
{
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showInfo();
}
function deleteData(){
    localStorage.clear();
    dataProduct.splice(0);
    showInfo();
}

//update
function updateProduct(i){
    title.value=dataProduct[i].title;
    price.value=dataProduct[i].price;
    taxes.value=dataProduct[i].taxes;
    ads.value=dataProduct[i].ads;
    discount.value=dataProduct[i].discount;
    getTotal();
    count.style.display='none';
    category.value=dataProduct[i].category;
    create.innerHTML='Update';
    CUmood = 'update';
    temp=i;
    scroll({
        top:0,
        behavior:'smooth',
    })

}
//search

function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        TCmood = 'title';
        
    }else{
        TCmood = 'category';
        
    }
    search.placeholder = 'Search By '+TCmood;
    search.focus();
    search.value='';
    showInfo();
}

function searchAbout(value)
{
    let table;
    for(let i=0 ; i < dataProduct.length ; i++){
        if(TCmood == 'title'){
            
                if(dataProduct[i].title.includes(value)){
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                    </tr>
                    `
                }
            
        }else
        {
            
                if(dataProduct[i].category.includes(value)){
                    table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                        </tr>
                    `;
                }
            
        }
    }


    document.getElementById('tbody').innerHTML = table;
}

let popup=document.getElementById('popup');
function openPopup(){
    popup.classList.add("open-popup");
}
function closePopup(){
    popup.classList.remove("open-popup");
}
