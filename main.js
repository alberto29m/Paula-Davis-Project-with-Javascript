//members[0].first_name
var members = data.results[0].members;
function tableFunction(members){
    var senateData = document.getElementById("senate-data");
    for(i = 0; i< members.length; i++){
        var row = document.createElement("tr");
        for(j = 0; j < 4; j++ ){
            var colums = document.createElement("td");
            var name = members[i].first_name  + members[i].last_name;//condicion para el middle name
            if(j == 0){var text =  name;}
            else if(j == 1){var text =  members[i].party;}
            else if(j == 2){var text =  members[i].state;}
            else if(j == 3){var text =  members[i].seniority;}
            else if(j == 4){var text = members[i].votes_with_party_pct;}//percentages
            console.log(text)
            colums.textContent = text;
            row.appendChild(colums);
        }
    senateData.appendChild(row);
    }
}  

tableFunction(members);