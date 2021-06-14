const { ipcRenderer, ipcMain } = require("electron");
const { lchown } = require("original-fs");

var foodTable = document.getElementById("food_table");
var foodVarientTable = document.getElementById("food_varient_table");
var foodAvaibleTable = document.getElementById("fd_availability_table");

function foods(evt, checkingFood) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(checkingFood).style.display = "block";
  evt.currentTarget.className += " active";
}

//foods table result
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("foodListLoaded");
});
ipcRenderer.on("foodsResultSent", function (event, foods) {
  var tr;
  foods.forEach((food) => {
    tr = document.createElement("tr");

    var id = document.createElement("td");
    id.textContent = food.id;

    var foodImage = document.createElement("td");
    var fImage = document.createElement("IMG");
    fImage.setAttribute("src", food.product_image);
    fImage.setAttribute("height", "30");
    fImage.setAttribute("width", "50");
    foodImage.appendChild(fImage);

    var categoryName = document.createElement("td");
    categoryName.textContent = food.name;

    var foodName = document.createElement("td");
    foodName.textContent = food.product_name;

    var foodComponent = document.createElement("td");
    foodComponent.textContent = food.component;

    var foodVat = document.createElement("td");
    foodVat.textContent = food.product_vat;

    var foodStatus = document.createElement("td");
    foodStatus.textContent =
      food.products_is_active == 1 ? "Active" : "Inactive";

    tr.append(
      id,
      foodImage,
      categoryName,
      foodName,
      foodComponent,
      foodVat,
      foodStatus
    );
    foodTable.appendChild(tr);
  });
  foodTable.style.fontSize = "12px";
});
//end of food table result

// food varient table
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("FoodVarient");
});
ipcRenderer.on("foodVarientResultSent", (evt, foodVarients) => {
  foodVarients.forEach((varient) => {
    var tr = document.createElement("tr");

    var si = document.createElement("td");
    si.textContent = varient.id;

    var varientName = document.createElement("td");
    varientName.textContent = varient.name;

    var foodName = document.createElement("td");
    foodName.textContent = varient.product_name;
    tr.append(si, varientName, foodName);
    foodVarientTable.appendChild(tr);
  });
  foodVarientTable.style.fontSize = "12px";
});
//end of food varient table

// food availability table
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("FoodAvailability");
});
ipcRenderer.on("foodAvailabilityResultSent", (evt, foodAvailability) => {
  foodAvailability.forEach((available) => {
    var tr = document.createElement("tr");

    var si = document.createElement("td");
    si.textContent = available.id;

    var foodName = document.createElement("td");
    foodName.textContent = available.product_name;

    var availDay = document.createElement("td");
    availDay.textContent = available.avail_day;

    var availTime = document.createElement("td");
    availTime.textContent = available.avail_time;
    tr.append(si, foodName, availDay, availTime);
    foodAvaibleTable.appendChild(tr);
  });
  foodAvaibleTable.style.fontSize = "12px";
});
//end of food availability table
