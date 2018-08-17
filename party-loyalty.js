var membersAll = data.results[0].members;

var Dem = 0;
var Rep = 0;
var Ind = 0;

var statistics={
    "Number_Of_Democrats":Dem,
    "Number_Of_Republicans":Rep,
    "Number_Of_Independents":Ind,
    "Democrats_Average_Voting":0,
    "Democrats_Average_Voting":0,
    "Members_Do_Not_Vote_Their_Party":0,
    "Members_Vote_Their_Party":0,
    "Members_Missed_Most_Votes":0,
    "Members_Missed_Least_Votes":0,      
}

function numberOfMembersEachParty(){
    for(var j = 0; j< membersAll.length; j++){
        if(membersAll[j].party === "D"){
            Dem++;
        }else if(membersAll[j].party === "R"){
            Rep++;
        }else if(membersAll[j].party === "I"){
            Ind++;
        }
    }
    console.log(Dem);
    console.log(Rep);
    console.log(Ind);
}
