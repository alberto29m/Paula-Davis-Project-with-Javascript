var members = data.results[0].members;
/*function tableFunction(members){
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


function tableFunction2(members){
    var senateData = document.getElementById("senate-data");
    var header = senateData.createTHead();
    senateData.appendChild(header);
    var body = document.createElement("tBody");
    senateData.appendChild(body);
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
    for(i = 0; i< members.length; i++){
        var row = document.createElement("tr");
        var middleName = members[i].middle_name;
        if(middleName == null){middleName = ""};
        var name = members[i].first_name + middleName  + members[i].last_name;
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
tableFunction2(members);



function filterByParty(){
    var checkedBoxes = document.querySelectorAll('input[name=myCheck]:checked');
    for(i=0; i< checkedBoxes.length; i++){
       if (checkedBoxes[i].value == "R"){
            console.log("R");
        }else if (checkedBoxes[i].value == "D"){
            console.log("D");
        }else if (checkedBoxes[i].value == "I") {
            console.log("I");
        }
    }
}

filterByParty();



 