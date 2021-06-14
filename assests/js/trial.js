var temp = 1;
function add() {
  var x = document.forms["data"]["ename"].value;
  if (x == null || x == "") {
    alert("Enter your Name");
    return false;
  }
  var y = document.forms["data"]["eid"].value;

  if (y == null || y == "") {
    alert("Enter your ID no");
    return false;
  }
  if (temp < 10) {
    var x = document.getElementById("res").insertRow(temp);
    var sno = x.insertCell(0);
    var name = x.insertCell(1);
    var id = x.insertCell(2);
    sno.innerHTML = "<input type='checkbox' id='cb' value=" + temp + ">";
    name.innerHTML = document.forms["data"]["ename"].value;
    id.innerHTML = document.forms["data"]["eid"].value;

    temp++;
  }
}

function delete1() {
  for (var i = 0; i < document.data1.cb.length; i++) {
    if (document.data1.cb[i].checked) {
      document.getElementById("res").deleteRow(document.data1.cb[i].value);
    }
  }
}
