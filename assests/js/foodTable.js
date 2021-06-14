const { ipcRenderer, ipcMain } = require("electron");

var foodTable = document.getElementById("food_table");
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("foodCategory");
});
ipcRenderer.on("foodTableResultSent", (evt, foodTables) => {
  foodTables.map(function (fTable, index) {
    var tr = document.createElement("tr");
    var si = document.createElement("td");
    si.textContent = index + 1;

    var icon = document.createElement("td");
    var img = document.createElement("IMG");
    img.setAttribute("src", fTable.table_icon);
    img.setAttribute("alt", "No image");
    img.setAttribute("width", "60");
    img.setAttribute("height", "40");
    icon.appendChild(img);

    var tableName = document.createElement("td");
    tableName.textContent = fTable.table_name;

    var capacity = document.createElement("td");
    capacity.textContent = fTable.person_capacity;

    tr.append(si, tableName, capacity, icon);
    foodTable.appendChild(tr);
  });
  foodTable.style.fontSize = "12px";
});
