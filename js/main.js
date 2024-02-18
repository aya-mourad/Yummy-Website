$(document).ready(function(){
    $(".loader").fadeOut(1000,function(){
         $(".loading").fadeOut(1000,function(){
            $("body").css("overflow","auto");
         });
        
    });
})
let sideinnerwidth=$(".sidbar-inner").innerWidth();
$(".sidebar").css("left",-sideinnerwidth);
function close()
{
    $(".sidebar").animate({left:-sideinnerwidth},600);
    $(".icon-open").html('<i class=" fa-solid fa-bars"></i>');
}
function open()
{
    let sideinnerwidth=$(".sidbar-inner").innerWidth();
    $(".sidebar").css("left",-sideinnerwidth);
    $(".sidebar").animate({left:"0px"},600);
    $(".icon-open").html('<i class="fa-solid fa-xmark"></i>');  
}
$(".sidebar-open .icon-open").click(()=>{
    
    if($(".sidebar").css("left")=="0px")
    {
       close();
    }
    else{
        open();
    }  
})
close();


let rowdata= document.getElementById("data");
let imagemeal= document.getElementsByClassName("mealsimages");
let searchCont= document.getElementById("search");




//Home
async function getMeals(){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    response= await response.json();
    displayMeals(response.meals);
}

function displayMeals(arr){
    
    let box="";
        for (let i = 0; i < arr.length; i++) {
            box+=`<div class="col-md-3">
            <div onclick="getMealDetails('${arr[i].idMeal}')" class=" meal position-relative overflow-hidden rounded-2 cursor-pointer ">
              <img src="${arr[i].strMealThumb}" class="w-100 mealsimages " alt="">
             <div class="layer position-absolute d-flex align-items-center text-black p-2 bg-white bg-opacity-75">
                 <h3>${arr[i].strMeal}</h3>
             </div>
         </div>
    
         </div>`
          }
          rowdata.innerHTML=box;                            
}
getMeals();




//Categories
async function getCategories(){
    searchCont.innerHTML = "";
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let data= await response.json();
displayCategories(data.categories);
}

function displayCategories(arr){
let box="";
for (let i = 0; i < arr.length; i++) {
    box+=`
    <div class="col-md-3">
    <div onclick="getCategory('${arr[i].strCategory}')" class="  meal position-relative overflow-hidden rounded-2 cursor-pointer">
      <img src="${arr[i].strCategoryThumb}" class="w-100 mealsimages " alt="">
     <div class="layer position-absolute text-center  text-black p-2 bg-white bg-opacity-75">
         <h3>${arr[i].strCategory}</h3>
          <p class="catpara">${arr[i].strCategoryDescription.split(" ").slice(0,22).join(" ")}</p>

     </div>
 </div>
 </div>`
  }
  rowdata.innerHTML=box;  
}

const categorieslink= document.querySelector(".Categories");
categorieslink.addEventListener('click',function(){
    getCategories();
    close();
})

async function getCategory(categ){
    rowdata.innerHTML="";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`);
    response= await response.json();
    displayMeals(response.meals.slice(0,20));
}




//MealDetails
async function getMealDetails(mealID){
    close();
    rowdata.innerHTML=" ";
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response= await response.json();
displayDetails(response.meals[0]);
}

function displayDetails(arr){
   let ingredients=``;
   for (let i = 1; i <= 20; i++) {
    if (arr[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
    }
}
let tags = arr.strTags.split(",")
if (!tags) tags = []

let tagsStr = ''
for (let i = 0; i < tags.length; i++) {
    tagsStr += `
    <li class="alert alert-danger list-unstyled tagg m-2 p-1">${tags[i]}</li>`
}

  let box=`
         <div class="col-md-4 coool">
                <img src="${arr.strMealThumb}" class="w-100" alt="">
                <h3>${arr.strMeal}</h3>
              </div>
              <div class="col-md-8 coool">
              <div class="inst">
                 <h1>Instructions </h1>
                 <p>${arr.strInstructions}</p>
              </div>
              <div class="content">
               <h3 class="fw-bold">Area: ${arr.strArea}</h3>
              <h3 class="fw-bold">Category: ${arr.strCategory} </h3>
              <h3>Recipes:
                  <ul class=" g-5 p-3 reciplist list-unstyled d-flex flex-wrap ">
                      ${ingredients}

                  </ul>
              </h3>
              </div>
                <div class="foot">
                    <h3>Tags: 
                    <ul class=" g-5 p-3 taglist list-unstyled d-flex flex-wrap ">
                    ${tagsStr}

                  </ul>
                     </h3>
                    <a class="btn btn-success"target="_blank" href="${arr.strSource}">Source</a>
                    <a class="btn btn-danger" target="_blank" href="${arr.strYoutube}">Youtube</a>
                </div>

              </div>
    `
   
   rowdata.innerHTML=box;
}




// Area
async function getArea(){
    searchCont.innerHTML = "";
    rowdata.innerHTML=" ";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response= await response.json();
    displayArea(response.meals);
}

function displayArea(arr){
    let box="";
 for(let i=0;i<arr.length;i++){
   box+=`<div class="col-md-3">
   <div onclick="getAreaMeals('${arr[i].strArea}')" class="area text-center">
   <span class="display-4"><i class="fa-solid fa-house-laptop "></i></span>
   <h3>${arr[i].strArea}</h3>
</div>
</div>`
rowdata.innerHTML=box;
 }
}
const Arealink= document.querySelector(".Area");
Arealink.addEventListener('click',function(){
    getArea();
    close();
});

async function getAreaMeals(area){
    rowdata.innerHTML=" ";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response= await response.json();
    displayMeals(response.meals);
}
  



// Ingredients
async function getIngredients(){
    searchCont.innerHTML = "";
    rowdata.innerHTML=" ";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response= await response.json();
    console.log(response);
    displayIngredients(response.meals.slice(0,22));
}

function displayIngredients(arr){
  let box="";
  for(let i=0;i<arr.length;i++){
    box+=` <div class="col-md-3">
    <div onclick="getMealsIngrediants('${arr[i].strIngredient}')" class="content text-center ingr">
        <span class="display-4"><i class="fa-solid fa-drumstick-bite"></i></span>
        <h3 >${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription.split(" ").slice(0,22).join(" ")}</p>
    </div>
  </div>`
  }
  rowdata.innerHTML=box;
}

const Ingrediantslink= document.querySelector(".Ingrediants");
Ingrediantslink.addEventListener('click',function(){
    getIngredients();
    close();
});

async function getMealsIngrediants(ingr){
    rowdata.innerHTML=" ";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`);
    response= await response.json();
    displayMeals(response.meals.slice(0,22));
}




//Search 
let search=document.getElementById("search");
function displaySearchPage(){
search.innerHTML=`
    <div class="row p-4">
     <div class="col-md-6">
         <input onkeyup="SearchByName(this.value)" type="text" id="searchname" placeholder="Search By Name" class="form-control bg-transparent text-white">
      </div>
      <div class="col-md-6">
          <input onkeyup="SearchByFirst(this.value)" type="text" id="searchFletter" placeholder="Search By First Letter" class="form-control bg-transparent text-white">
        </div>
    </div>
`
rowdata.innerHTML=" ";
}

const Searchlink= document.querySelector(".Search");
Searchlink.addEventListener('click',function(){
    displaySearchPage();
    close();
});


//Search by Name
async function SearchByName(name){
let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
data=await data.json();
  if(data.meals){
    displayMeals(data.meals);
  }
  else{
    displayMeals([]);
  }
}


//Search by first letter
async function SearchByFirst(fletter){
    if (fletter === "") {
        fletter = "s";
    }
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${fletter}`);
  data=await data.json();
  if(data.meals){
    displayMeals(data.meals);
  }
  else{
    displayMeals([]);
  }
}




//contact us
let submitbtn;
function displayContacts(){
    searchCont.innerHTML = "";
    rowdata.innerHTML=`
    <div class="min-vh-100 d-flex justify-content-center align-items-center pb-5" >
    <div class="container w-75  mt-5">
    <div class="row g-4 m-auto" id="data">
    <div class="col-md-6">
    <div class="content ">
        <input type="text" placeholder="Enter Your Name " id="nameinput" class="form-control">
        <p id="namevalidate" class="validation  mt-3 rounded-2 p-2 d-none">Special characters and numbers not allowed</p>
    </div>
 </div>
 <div class="col-md-6">
    <div class="content">
        <input type="email" onkeyup="ValidateUsers()" placeholder="Enter Your Email " id="email" class="form-control">
        <p id="emailvalidate" class="validation  mt-3 rounded-2 p-2 d-none">Email not valid *example@yyy.zzz</p>
    </div>
 </div>
 <div class="col-md-6">
    <div class="content">
        <input type="text"  onkeyup="ValidateUsers()" placeholder="Enter Your Phone " id="phone" class="form-control">
        <p id="phonevalidate"  class="validation mt-3  rounded-2 p-2 d-none">Enter valid Phone Number</p>
    </div>
 </div>
 <div class="col-md-6">
    <div class="content">
        <input type="number"  onkeyup="ValidateUsers()" placeholder="Enter Your Age " id="age" class="form-control">
        <p id="agevalidate"  class="validation  mt-3 rounded-2 p-2 d-none">Enter valid Age</p>
    </div>
 </div>
 <div class="col-md-6">
    <div class="content">
        <input type="password"  onkeyup="ValidateUsers()" placeholder="Enter Your password " id="pass" class="form-control">
        <p id="passvalidate"  class="validation  mt-3 rounded-2 p-2 w-75 d-none">Enter valid password *Minimum eight characters, at least one letter and one number*</p>
    </div>
 </div>
 <div class="col-md-6">
    <div class="content">
        <input type="password"  onkeyup="ValidateUsers()" placeholder="Repassword " id="repass" class="form-control">
        <p id="repassvalidate"  class="validation  mt-3 rounded-2 p-2 d-none">Enter valid repassword</p>
    </div>
 </div>
 <button id="btnSubmit" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
 </div>
</div>
</div>
    `
    submitbtn= document.getElementById("btnSubmit");
    document.getElementById("nameinput").addEventListener("focus",function(){
        nameInputtyping=true;
    })
    document.getElementById("email").addEventListener("focus",function(){
        emailInputtyping=true;
    })
    document.getElementById("phone").addEventListener("focus",function(){
        phoneInputtyping=true;
    })
    document.getElementById("age").addEventListener("focus",function(){
        ageInputtyping=true;
    })
    document.getElementById("pass").addEventListener("focus",function(){
        passInputtyping=true;
    })
    document.getElementById("repass").addEventListener("focus",function(){
        repassInputtyping=true;
    })
    console.log(document.getElementById("email").value);
}
const Contactlink= document.querySelector(".Contact");
Contactlink.addEventListener('click',function(){
    displayContacts();
    close();
});

function NameValidation(){
    // Regular expression to allow only letters (no special characters or numbers)
    const regex = /^[A-Za-z]+$/;
     return regex.test(document.getElementById("nameinput").value);     
}
function validateEmail() {
    // Basic email validation regex(example@yyy.zzz)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(document.getElementById("email").value);
  }
  function validatePhoneNumber() {
    //Egyptian Phone number validation regex (allows only numeric characters)
    const phoneRegex = /^(002|\+2)?01[0125][0-9]{8}$/;
    return phoneRegex.test(document.getElementById("phone").value);
  }
  function validateAge() {
    // Age validation regex btw 1 to 200
    const ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    return ageRegex.test(document.getElementById("age").value);
}
  function validatePassword() {
    // Password validation regex (Minimum eight characters, at least one letter and one number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordRegex.test(document.getElementById("pass").value);
  }
  function validateRePassword() {
    const password = document.getElementById("pass").value;
    const rePassword = document.getElementById("repass").value;
    return password==rePassword;
}

let nameInputtyping=false;
let emailInputtyping=false;
let phoneInputtyping=false;
let ageInputtyping = false;
let passInputtyping=false;
let repassInputtyping= false;

function ValidateUsers(){
if(nameInputtyping){
    if(NameValidation()){
        document.getElementById("namevalidate").classList.replace("d-block", "d-none");
    }
    else{
        document.getElementById("namevalidate").classList.replace("d-none", "d-block");
    }
}
if(emailInputtyping){
    if(validateEmail()){
        document.getElementById("emailvalidate").classList.replace("d-block", "d-none");
    }
    else{
        document.getElementById("emailvalidate").classList.replace("d-none", "d-block");
    }
}
if(phoneInputtyping){
    if(validatePhoneNumber()){
        document.getElementById("phonevalidate").classList.replace("d-block", "d-none");
    }
    else{
        document.getElementById("phonevalidate").classList.replace("d-none", "d-block");
    }
}
if (ageInputtyping) {
    if (validateAge()) {
        document.getElementById("agevalidate").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("agevalidate").classList.replace("d-none", "d-block")
    }
}
if(passInputtyping){
    if(validatePassword()){
        document.getElementById("passvalidate").classList.replace("d-block", "d-none");
    }
    else{
        document.getElementById("passvalidate").classList.replace("d-none", "d-block");
    }
}
if(repassInputtyping){
    if(validateRePassword()){
        document.getElementById("repassvalidate").classList.replace("d-block", "d-none");
    }
    else{
        document.getElementById("repassvalidate").classList.replace("d-none", "d-block"); 
    }
}
if(
    NameValidation()&&validateEmail()&&validatePassword()&&validatePhoneNumber()&&validateRePassword()
){
  submitbtn.removeAttribute("disabled");
}
}