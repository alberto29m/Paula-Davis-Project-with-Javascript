var membersAll = data.results[0].members;

var dem = 0;
var rep = 0;
var ind = 0;


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
    console.log(dem);
    console.log(rep);
    console.log(ind);
}

var demVotes;
var repVotes;
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
    console.log(demVotes);
    console.log(repVotes);
}


var tenPctLeastArrayMembers = [];

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
}

var tenPctMostArrayMembers = [];

function membersMostVoteTheirParty(){
    var tenPctArray = [];
    var arrayVotesParty = [];
    
    for(var i = 0; i < membersAll.length; i++){
        arrayVotesParty.push(membersAll[i].votes_with_party_pct);
    }
    //array solo con pct
    arrayVotesParty.sort(function(a, b){return b-a});
    
    console.log(arrayVotesParty);
    
    var tenPcntNum = (membersAll.length * 10)/100;
    tenPcntNum = tenPcntNum.toFixed(0);
    console.log(tenPcntNum);
    
    for(var j = 0; j <tenPcntNum; j++){
        tenPctArray.push(arrayVotesParty[j]);
    }
    
    var arrayWithoutTenPct = []; 
    console.log(arrayVotesParty)
    
    for(var m = 0; m < arrayVotesParty.length; m++){
        if(m > tenPctArray.length-1){
            arrayWithoutTenPct.push(arrayVotesParty[m]);
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
    
//    tenPctArray.sort(function(a, b){return a-b});
    console.log(tenPctArray);
    
    for(var s = 0; s<tenPctArray.length; s++){
        for(var l = 0; l<membersAll.length; l++){
            if(arrayVotesParty[s]=== membersAll[l].votes_with_party_pct){
                if(tenPctMostArrayMembers.indexOf(membersAll[l])==-1){
                    tenPctMostArrayMembers.push(membersAll[l]);
                    
                }
            }
        }
    }
    console.log(tenPctMostArrayMembers);
}

membersMostVoteTheirParty()




/*
var statistics={
    "Number_Of_Democrats":dem,
    "Number_Of_Republicans":rep,
    "Number_Of_Independents":ind,
    "Democrats_Average_Voting":demVotes + "%",
    "Republicans_Average_Voting":repVotes + "%",
    "Members_Do_Not_Vote_Their_Party":0,
    "Members_Vote_Their_Party":0,
    "Members_Missed_Most_Votes":tenPctMostArrayMembers,
    "Members_Missed_Least_Votes":tenPctArrayMembers,      
}
*/
