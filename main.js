var allMembers;


if (document.getElementById("senate") != null){
    fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {

       method: "GET",
       headers: {
           'X-API-Key': 'DHbvC92HKDPm4s3ZZj6QFYhPB4gm4bqvqJlGFEv5'
       }
    }).then(function (response) {

       if (response.ok) {
           // add a new promise to the chain
           return response.json();
       }
       // signal a server error to the chain
       throw new Error(response.statusText);
    }).then(function (json) {
       // equals to .success in JQuery Ajax call;
        data = json;
        allMembers = data.results[0].members;

        tableFunctionHead();
        tableFunctionBody(allMembers);
        createDropdownMenu();
        document.getElementById("dropdownMenu").onchange = function () {
        updateTable();};
        document.getElementById("checkboxes").onchange = function () {
        updateTable();};

    }).catch(function (error) {
       // called when an error occurs anywhere in the chain
       console.log("Request failed: " + error.message);
    });

}else if(document.getElementById("house")!= null){

    fetch("https://api.propublica.org/congress/v1/113/house/members.json", {

       method: "GET",
       headers: {
           'X-API-Key': 'DHbvC92HKDPm4s3ZZj6QFYhPB4gm4bqvqJlGFEv5'
       }
    }).then(function (response) {

       if (response.ok) {
           return response.json();
       }
       throw new Error(response.statusText);
    }).then(function (json) {
        data = json;
        allMembers = data.results[0].members;

        tableFunctionHead();
        tableFunctionBody(allMembers);
        createDropdownMenu();
        document.getElementById("dropdownMenu").onchange = function () {
        updateTable();};
        document.getElementById("checkboxes").onchange = function () {
        updateTable();};


    }).catch(function (error) {
       console.log("Request failed: " + error.message);
    });
}



/*
Así hice la función en primera instancia, de forma limpia. Después quise simplificar el código, pero funciona igual.
function tableFunction(members){
    var senateData = document.getElementById("senate-data");
    var firstRow = document.createElement("tr");
    var cols1th = document.createElement("th");
    var cols2th = document.createElement("th");
    var cols3th = document.createElement("th");
    var cols4th = document.createElement("th");
    var cols5th = document.createElement("th");
    cols1th = document.createTextNode("Full Name");
    cols2th = document.createTextNode("Party");
    cols3th = document.createTextNode("State");
    cols4th = document.createTextNode("Seniority");
    cols5th = document.createTextNode("Votes");
    senateData.appendChild(firstRow);
    firstRow.appendChild(cols1th);
    firstRow.appendChild(cols2th);
    firstRow.appendChild(cols3th);
    firstRow.appendChild(cols4th);
    firstRow.appendChild(cols5th);
    for(i = 0; i< members.length; i++){
        var row = document.createElement("tr");
        for(j = 0; j < 4; j++ ){
            var colums = document.createElement("td");
            var middleName = members[i].middle_name;
            var name = members[i].first_name + middleName + members[i].last_name;
            if(j == 0){var text =  name;}
            else if(j == 1){var text =  members[i].party;}
            else if(j == 2){var text =  members[i].state;}
            else if(j == 3){var text =  members[i].seniority;}
            else if(j == 4){var text = members[i].votes_with_party_pct + "%";}
            colums.textContent = text;
            row.appendChild(colums);
        }
    senateData.appendChild(row);
    }
}  

tableFunction(members);*/

//tableFunctionBody(allMembers);
function tableFunctionBody(members){
    console.log(1)
    var senateData = document.getElementById("senate-data");
    var body = document.createElement("tBody");
    body.setAttribute("id", "tBody");
    senateData.appendChild(body);
    for(i = 0; i< members.length; i++){
        var row = document.createElement("tr");
        var middleName = members[i].middle_name;
        if(middleName == null){middleName = ""};
        var name = members[i].first_name + middleName+ " " + members[i].last_name;
        var cols1 = document.createElement("td");
        var cols2 = document.createElement("td");
        var cols3 = document.createElement("td");
        var cols4 = document.createElement("td");
        var cols5 = document.createElement("td"); 
        var nameLink = document.createElement("a");
        nameLink.setAttribute("href", members[i].url);
        nameLink.textContent = name;
        cols1.appendChild(nameLink);
        cols2.textContent = members[i].party;
        cols3.textContent = members[i].state;
        cols4.textContent = members[i].seniority;
        cols5.textContent = members[i].votes_with_party_pct + "%";
        row.appendChild(cols1);
        row.appendChild(cols2);
        row.appendChild(cols3);
        row.appendChild(cols4);
        row.appendChild(cols5);
        body.appendChild(row);
    }
}
//tableFunction2(members);


function tableFunctionHead(){
    var senateData = document.getElementById("senate-data");
    var header = senateData.createTHead();
    senateData.appendChild(header);
     var firstRow = document.createElement("tr");
    var cols1th = document.createElement("th");
    var cols2th = document.createElement("th");
    var cols3th = document.createElement("th");
    var cols4th = document.createElement("th");
    var cols5th = document.createElement("th");
    cols1th.textContent ="Senator's Name";
    cols2th.textContent ="Party Affilication";
    cols3th.textContent ="State";
    cols4th.textContent ="Seniority";
    cols5th.textContent ="Votes Percentage";
    header.appendChild(firstRow);
    firstRow.appendChild(cols1th);
    firstRow.appendChild(cols2th);
    firstRow.appendChild(cols3th);
    firstRow.appendChild(cols4th);
    firstRow.appendChild(cols5th);
}

// tableFunctionHead()

function filterByParty(){
    var checkedBoxes = document.querySelectorAll('input[name=myCheck]:checked');
    //checkBoxes = es un array con los IDs de los checkboxes que estén checkeados.
    var newArray = []
    var newMembersArray = []
    var options1 = makeNewArray();
    var select = document.getElementById("dropdownMenu");
    var selectedValue = dropdownMenu.options[dropdownMenu.selectedIndex].value;

    for (var i = 0; i < checkedBoxes.length; i++) {
        newArray.push(checkedBoxes[i].value);
    }
    console.log(newArray);
    for(var i=0; i< newArray.length; i++){
            for(var j = 0; j<  allMembers.length; j++){
                if( (allMembers[j].party == newArray[i]) && (allMembers[j].state === selectedValue)){
                    newMembersArray.push( allMembers[j]);
                }else if((allMembers[j].party == newArray[i]) && (selectedValue == "all")){
                    newMembersArray.push(allMembers[j]);
                }
            }
    }
    tableFunctionBody(newMembersArray);
}
//document.getElementById("dropdownMenu").onchange = function () {
//    updateTable();
//};
//
//document.getElementById("checkboxes").onchange = function () {
//    updateTable();
//};

function updateTable(){
    console.log("hola")
    removeTable();
    filterByParty();
}
function removeTable(){
    document.getElementById("tBody").remove();
}
 


function makeNewArray(){
    var arrayOptions=[];
    
    for (i = 0; i < allMembers.length; i++){
        if(arrayOptions.indexOf(allMembers[i].state)=== -1){    
        arrayOptions.push(allMembers[i].state);
        }
    }
    arrayOptions.sort();                
    return arrayOptions;
}

function createDropdownMenu(){
    var select = document.getElementById("dropdownMenu");
    var options1 = makeNewArray();
    for (var i = 0; i<options1.length ; i++){
        var  option = document.createElement("option");
        option.textContent =options1[i]; 
        select.appendChild(option);
        option.setAttribute("value", options1[i]);
    }
}
//createDropdownMenu();

/*function filterByDropdownMenu(){
    var newMembersState = [];
    var options1 = makeNewArray();
    var select = document.getElementById("dropdownMenu");
    var selectedValue = dropdownMenu.options[dropdownMenu.selectedIndex].value;
    console.log(selectedValue);
    for(var j = 0; j<  allMembers.length; j++){
        if( allMembers[j].state === selectedValue){
                  newMembersState.push( allMembers[j]);
            }
        }
       
    console.log(newMembersState);
    tableFunctionBody(newMembersState);
}

filterByDropdownMenu();*/


