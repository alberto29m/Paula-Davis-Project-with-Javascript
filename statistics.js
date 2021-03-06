//var membersAll = data.results[0].members;
var data;
var membersAll;

var dem = 0;
var rep = 0;
var ind = 0;

var demVotes;
var repVotes;

var arrayVotesParty = [];

var mostArray = [];
var leastArray = [];

if ((window.location.pathname == '/senate-party-loyalty.html')||(window.location.pathname == '/senate-attendance.html')){
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
        membersAll = data.results[0].members;

        numberOfMembersEachParty();
        votesWithPartyAvarage();
        createArrayVotesParty(membersAll);
        sortByLeast();
        sortByMost();
        membersVoteTheirParty(membersAll,sortByMost(),mostArray);
        membersVoteTheirParty(membersAll,sortByLeast(),leastArray);
        tableFunctionHeadSenateGlance();
        tableFunctionBodySenateGlance();
    //    tableFunctionHeadLoyal("most-loyal");
    //    tableFunctionHeadLoyal("least-loyal");
    //    tableFunctionBodyLoyal(statistics.Members_Missed_Least_Votes, "least-loyal");
    //    tableFunctionBodyLoyal(statistics.Members_Missed_Most_Votes, "most-loyal");
    //    tableFunctionHeadAttendance("most-engage");
    //    tableFunctionHeadAttendance("least-engage");
    //    tableFunctionBodyAttendance(statistics.Members_Missed_Least_Votes, "least-engage");
    //    tableFunctionBodyAttendance(statistics.Members_Missed_Most_Votes, "most-engage");
        callMyFunctionTable();
  
    }).catch(function (error) {
       // called when an error occurs anywhere in the chain
       console.log("Request failed: " + error.message);
    });
}else if ((window.location.pathname == '/house-attendance.html')||(window.location.pathname == '/house-party-loyalty.html')){

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
        membersAll = data.results[0].members;

        numberOfMembersEachParty();
        votesWithPartyAvarage(membersAll);
        createArrayVotesParty(membersAll);
        sortByLeast();
        sortByMost();
        membersVoteTheirParty(membersAll,sortByMost(),mostArray);
        membersVoteTheirParty(membersAll,sortByLeast(),leastArray);
        tableFunctionHeadSenateGlance();
        tableFunctionBodySenateGlance();
        callMyFunctionTable();

    }).catch(function (error) {
       console.log("Request failed: " + error.message);
    });
}

//function makeLoader(){
//    var div = document.createElement("div");
//    div.setAttribute("class", loader);
//}


function numberOfMembersEachParty(){
    for(var i = 0; i< membersAll.length; i++){
        if(membersAll[i].party === "D"){
            dem++;
        }else if(membersAll[i].party === "R"){
            rep++;
        }else if(membersAll[i].party === "I"){
            ind++;
        }
    }
    statistics["Number_Of_Democrats"] = dem;
    statistics["Number_Of_Republicans"] = rep;
    statistics["Number_Of_Independents"] = ind;
    console.log(dem);
    console.log(rep);
    console.log(ind);
}



function votesWithPartyAvarage(){
    var democrats = [];
    var republicans = [];
    for(var i = 0; i< membersAll.length; i++){
        if(membersAll[i].party === "D"){
            democrats.push(membersAll[i].votes_with_party_pct);
        }else if(membersAll[i].party === "R"){
            republicans.push(membersAll[i].votes_with_party_pct);
        }
    }
    demVotes = (democrats.reduce(function(a, b) { return a + b; }, 0))/democrats.length;
    repVotes = (republicans.reduce(function(a, b) { return a + b; }, 0))/republicans.length;
    demVotes = demVotes.toFixed(2);
    repVotes = repVotes.toFixed(2);
    statistics["Democrats_Average_Voting"] = demVotes;
    statistics["Republicans_Average_Voting"] = repVotes;
    console.log(demVotes);
    console.log(repVotes);
}




/*var tenPctLeastArrayMembers = [];

function membersLeastVoteTheirParty(){
    var tenPctArray = [];
    var arrayVotesParty = [];
    for(var i = 0; i < membersAll.length; i++){
        arrayVotesParty.push(membersAll[i].votes_with_party_pct);
    }
    arrayVotesParty.sort(function(a, b){return a-b});
    console.log(arrayVotesParty);
    var tenPcntNum = (membersAll.length * 10)/100;
    tenPcntNum = tenPcntNum.toFixed(0);
    console.log(tenPcntNum);
    for(var j = 0; j<tenPcntNum; j++){
        tenPctArray.push(arrayVotesParty[j]);
    }
    console.log(tenPctArray);
    var arrayWithoutTenPct = [];
    for(var m = 0; m < membersAll.length; m++){
        if(m > tenPcntNum.lenght){
            arrayWithoutTenPct.push(membersAll[m].votes_with_party_pct);
        }
    }
    for(var n = 0; n< arrayWithoutTenPct.length;n++){
        if(tenPctArray[tenPctArray.length] === arrayWithoutTenPct[n]){
            tenPctArray.push(arrayWithoutTenPct[n].votes_with_party_pct);
        }
    }
    for(var s = 0; s<tenPctArray.length; s++){
        for(var l = 0; l<membersAll.length; l++){
            if(arrayVotesParty[s]=== membersAll[l].votes_with_party_pct){
                tenPctLeastArrayMembers.push(membersAll[l]);
            }
        }
    }
    console.log(tenPctLeastArrayMembers);
}*/



function createArrayVotesParty(array){
    for(var i = 0; i < array.length; i++){
        arrayVotesParty.push(array[i].votes_with_party_pct);
    }
}



function sortByLeast(){
    arrayVotesParty.sort(function(a, b){return a-b});
    return arrayVotesParty;
}
function sortByMost(){
    arrayVotesParty.sort(function(a, b){return b-a});
    return arrayVotesParty;
}


function membersVoteTheirParty(array,array2,array3){
    var tenPctArray = [];
    var tenPcntNum = (array.length * 10)/100;
    tenPcntNum = tenPcntNum.toFixed(0);
    console.log(tenPcntNum);
    
    for(var j = 0; j <tenPcntNum; j++){
        tenPctArray.push(array2[j]);
    }
    
    var arrayWithoutTenPct = []; 
    console.log(array2)
    
    for(var m = 0; m < array2.length; m++){
        if(m > tenPctArray.length-1){
            arrayWithoutTenPct.push(array2[m]);
        }
    }
    //members pct sin ordernar, a partir de la posicion 11
    console.log(arrayWithoutTenPct)
    console.log(tenPctArray[tenPctArray.length-1])
    
    for(var n = 0; n< arrayWithoutTenPct.length;n++){
        if(tenPctArray[tenPctArray.length-1] === arrayWithoutTenPct[n]){
            tenPctArray.push(arrayWithoutTenPct[n]);
        }
    }
    
    console.log(tenPctArray);
    
    for(var s = 0; s<tenPctArray.length; s++){
        for(var l = 0; l<array.length; l++){
            if(array2[s]=== array[l].votes_with_party_pct){
                if(array3.indexOf(array[l])==-1){
                    array3.push(array[l]);
                    
                }
            }
        }
    }
    console.log(array3);
}





var statistics={
    "Number_Of_Democrats":dem,
    "Number_Of_Republicans":rep,
    "Number_Of_Independents":ind,
    "Democrats_Average_Voting":demVotes,
    "Republicans_Average_Voting":repVotes,
    "Members_Missed_Most_Votes":mostArray,
    "Members_Missed_Least_Votes":leastArray,      
}


// TABLA PARA GLANCE:
function tableFunctionHeadSenateGlance(){
    var senateData = document.getElementById("glance");
    var header = senateData.createTHead();
    senateData.appendChild(header);
     var firstRow = document.createElement("tr");
    var cols1th = document.createElement("th");
    var cols2th = document.createElement("th");
    var cols3th = document.createElement("th");
    cols1th.textContent ="Party";
    cols2th.textContent ="Number of Reps";
    cols3th.textContent ="% Voted with Party";
    header.appendChild(firstRow);
    firstRow.appendChild(cols1th);
    firstRow.appendChild(cols2th);
    firstRow.appendChild(cols3th);
}


function tableFunctionBodySenateGlance(){
    var senateData = document.getElementById("glance");
    var body = document.createElement("tBody");
    body.setAttribute("id", "tBody");
    senateData.appendChild(body);
    console.log(statistics.Number_Of_Independents)
    for(i = 0; i< 4; i++){
        var row = document.createElement("tr");
        var cols1 = document.createElement("td");
        var cols2 = document.createElement("td");
        var cols3 = document.createElement("td");
        if(i == 0){
            cols1.textContent = "Democrats";
            cols2.textContent = statistics.Number_Of_Democrats;
            cols3.textContent = statistics.Democrats_Average_Voting + "%";
        }else if(i == 1){
            cols1.textContent = "Republicans";
            cols2.textContent = statistics.Number_Of_Republicans;
            cols3.textContent = statistics.Republicans_Average_Voting + "%";
        }else if(i == 2){
            cols1.textContent = "Independents";
            cols2.textContent = statistics.Number_Of_Independents;
            cols3.textContent = 0 + "%";
        }else if(i == 3){
            cols1.textContent = "Total";
            cols2.textContent = statistics.Number_Of_Democrats + statistics.Number_Of_Republicans + statistics.Number_Of_Independents;
        }
        row.appendChild(cols1);
        row.appendChild(cols2);
        row.appendChild(cols3);
        body.appendChild(row);
    }
}




    //TABLA PARA LOYAL:
//    function tableFunctionHeadLoyal(id){
//        var table = document.getElementById(id);
//    //    var header = senateData.createTHead();
//    //    senateData.appendChild(header);
//        var firstRow = document.createElement("tr");
//        var cols1th = document.createElement("th");
//        var cols2th = document.createElement("th");
//        var cols3th = document.createElement("th");
//        cols1th.textContent ="Name";
//        cols2th.textContent ="Number Party Votes";
//        cols3th.textContent ="% Party Votes";
//        table.appendChild(firstRow);
//        firstRow.appendChild(cols1th);
//        firstRow.appendChild(cols2th);
//        firstRow.appendChild(cols3th);
//    }
//
//
//    function tableFunctionBodyLoyal(array,id){
//        var senateData = document.getElementById(id);
//        var body = document.createElement("tBody");
//        body.setAttribute("id", "tBody");
//        senateData.appendChild(body);
//        for(i = 0; i< array.length; i++){
//            var row = document.createElement("tr");
//            var cols1 = document.createElement("td");
//            var cols2 = document.createElement("td");
//            var cols3 = document.createElement("td");
//            var middleName = array[i].middle_name;
//            if(middleName == null){middleName = ""};
//            var name = array[i].first_name + array[i].middle_name  + " " + array[i].last_name;
//            var nameLink = document.createElement("a");
//            nameLink.setAttribute("href", array[i].url);
//            nameLink.textContent = name;
//            cols1.appendChild(nameLink);
//            cols2.textContent = array[i].total_votes;
//            cols3.textContent = array[i].votes_with_party_pct + "%";
//            row.appendChild(cols1);
//            row.appendChild(cols2);
//            row.appendChild(cols3);
//            body.appendChild(row);
//        }
//    }

    


//TABLAS PARA ATTENDANCE:
function tableFunctionHeadAttendance(id){
    var attendanceData = document.getElementById(id);
//    var header = attendancedata.createTHead();
//    attendancedata.appendChild(header);
    var firstRow = document.createElement("tr");
    var cols1th = document.createElement("th");
    var cols2th = document.createElement("th");
    var cols3th = document.createElement("th");
    cols1th.textContent ="Name";
    cols2th.textContent ="Number Missed Votes";
    cols3th.textContent ="% Missed Votes";
    attendanceData.appendChild(firstRow);
    firstRow.appendChild(cols1th);
    firstRow.appendChild(cols2th);
    firstRow.appendChild(cols3th);
}


function tableFunctionBodyAttendance(array,id){
    var senateData = document.getElementById(id);
    var body = document.createElement("tBody");
    body.setAttribute("id", "tBody");
    senateData.appendChild(body);
    for(i = 0; i< array.length; i++){
        var row = document.createElement("tr");
        var cols1 = document.createElement("td");
        var cols2 = document.createElement("td");
        var cols3 = document.createElement("td");
        var middleName = array[i].middle_name;
        if(middleName == null){middleName = ""};
        var name = array[i].first_name + middleName  + " " + array[i].last_name;
        var nameLink = document.createElement("a");
        nameLink.setAttribute("href", array[i].url);
        nameLink.textContent = name;
        cols1.appendChild(nameLink);
        cols2.textContent = array[i].missed_votes;
        cols3.textContent = array[i].missed_votes_pct + "%";
        row.appendChild(cols1);
        row.appendChild(cols2);
        row.appendChild(cols3);
        body.appendChild(row);
    }
}


  function tableFunctionHeadLoyal(id){
        var table = document.getElementById(id);
    //    var header = senateData.createTHead();
    //    senateData.appendChild(header);
        var firstRow = document.createElement("tr");
        var cols1th = document.createElement("th");
        var cols2th = document.createElement("th");
        var cols3th = document.createElement("th");
        cols1th.textContent ="Name";
        cols2th.textContent ="Number Party Votes";
        cols3th.textContent ="% Party Votes";
        table.appendChild(firstRow);
        firstRow.appendChild(cols1th);
        firstRow.appendChild(cols2th);
        firstRow.appendChild(cols3th);
    }


    function tableFunctionBodyLoyal(array,id){
        var senateData = document.getElementById(id);
        var body = document.createElement("tBody");
        body.setAttribute("id", "tBody");
        senateData.appendChild(body);
        for(i = 0; i< array.length; i++){
            var row = document.createElement("tr");
            var cols1 = document.createElement("td");
            var cols2 = document.createElement("td");
            var cols3 = document.createElement("td");
            var middleName = array[i].middle_name;
            if(middleName == null){middleName = " "};
            var name = array[i].first_name + middleName  + " " + array[i].last_name;
            var nameLink = document.createElement("a");
            nameLink.setAttribute("href", array[i].url);
            nameLink.textContent = name;
            cols1.appendChild(nameLink);
            cols2.textContent = array[i].total_votes;
            cols3.textContent = array[i].votes_with_party_pct + "%";
            row.appendChild(cols1);
            row.appendChild(cols2);
            row.appendChild(cols3);
            body.appendChild(row);
        }
    }

function callMyFunctionTable(){
    if((window.location.pathname == '/senate-party-loyalty.html')||(window.location.pathname == '/house-party-loyalty.html')){
        tableFunctionHeadLoyal("most-loyal");
        tableFunctionHeadLoyal("least-loyal");
        tableFunctionBodyLoyal(statistics.Members_Missed_Least_Votes, "least-loyal");
        tableFunctionBodyLoyal(statistics.Members_Missed_Most_Votes, "most-loyal");;
    }else if (((window.location.pathname == '/senate-attendance.html')||(window.location.pathname == '/house-attendance.html')) ){
        tableFunctionHeadAttendance("most-engage");
        tableFunctionHeadAttendance("least-engage");
        tableFunctionBodyAttendance(statistics.Members_Missed_Least_Votes, "least-engage");
        tableFunctionBodyAttendance(statistics.Members_Missed_Most_Votes, "most-engage");
    }
}
