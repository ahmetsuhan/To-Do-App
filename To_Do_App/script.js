//UI variables

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#taskList");
let items;


//load items
loadItems();




//call event listeners
eventListeners();
function eventListeners() {
    // submit event
    form.addEventListener("submit", addNewItem);

    //delete an item
    taskList.addEventListener("click", deleteItem);

    //delete all items
    btnDeleteAll.addEventListener("click", deleteAllItems);

}

//load items
function loadItems(){
    items = getItemsFromLocalStorage();

    items.forEach(function(item){
        createItem(item);
    });
}

//Get items from local storage
function getItemsFromLocalStorage()
{
    if(localStorage.getItem("items") == null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
}


//set item to local storage
function setItemToLocalStorage(text){
    items = getItemsFromLocalStorage();
    items.push(text);
    localStorage.setItem("items",JSON.stringify(items));
}

//delete item to local storage
function deleteItemFromLocalStorage(text){
    items = getItemsFromLocalStorage();
    items.forEach(function(item,index){
        if(item==text){
            items.splice(index,1);
        }
    });
    localStorage.setItem("items",JSON.stringify(items));
}


function createItem(text){
     //create li
     const li = document.createElement("li");
     li.className = "list-group-item list-group-item-secondary";
     li.appendChild(document.createTextNode(text));
     //console.log(li);

     //create a
     const a = document.createElement("a");
     a.classList = "delete-item float-end";
     a.setAttribute("href", "#");
     a.innerHTML = '<i class="fas fa-times"></i>';
     //console.log(a);

     //add a to li (li>a)
     li.appendChild(a);
     //console.log(li);

     //add li to ul (ul>li)
     taskList.appendChild(li);
     //console.log(taskList);
}






//add new item
function addNewItem(event) {
    //console.log(input.value);
    if (input.value == "") {
        alert("add new item!");
    }
    else {
        //create item 
        createItem(input.value);

        //save to localstorage
        setItemToLocalStorage(input.value);
        //clear input 
        input.value = "";
    }

    event.preventDefault();
}

//delete an item
function deleteItem(event) {
    if (event.target.className == "fas fa-times") {
        //console.log(event.target);
        if (confirm("Are you sure?")) {
            event.target.parentElement.parentElement.remove();

            //delete item from local storage
            deleteItemFromLocalStorage(event.target.parentElement.parentElement.textContent);
            //console.log(event.target.parentElement.parentElement.textContent);
        }
    }
    event.preventDefault();
}

//delete all items
function deleteAllItems(event) {
    if (confirm("Are you sure?")) {
        //taskList.innerHTML="";
       while(taskList.firstChild){
           taskList.removeChild(taskList.firstChild);
       }
        //clear local storage
        localStorage.clear();
    }


    event.preventDefault();
}



