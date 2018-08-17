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
    console.log(demVotes);
    console.log(repVotes);
}







var statistics={
    "Number_Of_Democrats":dem,
    "Number_Of_Republicans":rep,
    "Number_Of_Independents":ind,
    "Democrats_Average_Voting":demVotes + "%",
    "Democrats_Average_Voting":repVotes + "%",
    "Members_Do_Not_Vote_Their_Party":0,
    "Members_Vote_Their_Party":0,
    "Members_Missed_Most_Votes":0,
    "Members_Missed_Least_Votes":0,      
}
