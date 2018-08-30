var app = new Vue({
  el: '#attendanceLoyalty',
    data:{
        name: "",
    
        membersAll: [],
        dem : 0,
        rep : 0,
        ind : 0,

        demVotes: 0,
        repVotes: 0,

        arrayVotesParty : [],
        arrayVotesMissed: [],

        mostArray : [],
        mostMissedArray : [],
        leastArray : [],
        leastMissedArray : []
    },
    created: function() {
        this.getData();
    },
    methods:{
        getData: function(){
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
                    app.loader();
                   // equals to .success in JQuery Ajax call;
                    app.membersAll = json.results[0].members;
                    
            
                    app.numberOfMembersEachParty();
                    app.votesWithPartyAvarage();
                    
                    app.createArrayVotesParty(app.membersAll);
                    app.createArrayVotesMissed(app.membersAll);
                    
                    app.membersVoteTheirParty(app.membersAll, app.sortByLeast(), app.mostArray,"votes_with_party_pct");
                    app.membersVoteTheirParty(app.membersAll,app.sortByMost(),app.leastArray, "votes_with_party_pct");
                    
                    app.membersVoteTheirParty(app.membersAll, app.sortByLeastMissed(), app.mostMissedArray, "missed_votes_pct");
                    app.membersVoteTheirParty(app.membersAll,app.sortByMostMissed(),app.leastMissedArray,"missed_votes_pct");



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
                    app.loader();
                    
                    app.membersAll = json.results[0].members;
                
                    app.numberOfMembersEachParty();
                    app.votesWithPartyAvarage();
                    
                    app.createArrayVotesParty(app.membersAll);
                    app.createArrayVotesMissed(app.membersAll);
                    
                    app.membersVoteTheirParty(app.membersAll, app.sortByLeast(), app.mostArray,"votes_with_party_pct");
                    app.membersVoteTheirParty(app.membersAll,app.sortByMost(),app.leastArray,"votes_with_party_pct");
                    
                    app.membersVoteTheirParty(app.membersAll, app.sortByLeastMissed(), app.mostMissedArray, "missed_votes_pct");
                    app.membersVoteTheirParty(app.membersAll,app.sortByMostMissed(),app.leastMissedArray, "missed_votes_pct");


                }).catch(function (error) {
                   console.log("Request failed: " + error.message);
                });
            }
            
            
    },
    fullName: function(member){
        var middleName = member.middle_name;
        if(middleName == null){middleName = ""};
        name = member.first_name + middleName+ " " + member.last_name;
        return name;
    },
    numberOfMembersEachParty: function(){
        for(var i = 0; i< app.membersAll.length; i++){
            if(app.membersAll[i].party === "D"){
                console.log("hola")
               app.dem++
            }else if(app.membersAll[i].party === "R"){
                app.rep++
            }else if(app.membersAll[i].party === "I"){
                app.ind++
            }
        }
        console.log(app.dem);
        console.log(app.rep);
        console.log(app.ind);
    },
    votesWithPartyAvarage: function(){
        var democrats = [];
        var republicans = [];
        for(var i = 0; i< app.membersAll.length; i++){
            if(app.membersAll[i].party === "D"){
                democrats.push(app.membersAll[i].votes_with_party_pct);
            }else if(app.membersAll[i].party === "R"){
                republicans.push(app.membersAll[i].votes_with_party_pct);
            }
        }
        app.demVotes = (democrats.reduce(function(a, b) { return a + b; }, 0))/democrats.length;
        app.repVotes = (republicans.reduce(function(a, b) { return a + b; }, 0))/republicans.length;
        app.demVotes = app.demVotes.toFixed(2);
        app.repVotes = app.repVotes.toFixed(2);
//        statistics["Democrats_Average_Voting"] = demVotes;
//        statistics["Republicans_Average_Voting"] = repVotes;
        console.log(app.demVotes);
        console.log(app.repVotes);
    },
    createArrayVotesParty: function(array){
        for(var i = 0; i < array.length; i++){
            app.arrayVotesParty.push(array[i].votes_with_party_pct);
        }
    },
    createArrayVotesMissed: function(array){
        for(var i = 0; i < array.length; i++){
            app.arrayVotesMissed.push(array[i].missed_votes_pct);
        }
    },
    sortByLeast: function(){
    app.arrayVotesParty.sort(function(a, b){return a-b});
    return app.arrayVotesParty;
    },
    sortByMost: function(){
        app.arrayVotesParty.sort(function(a, b){return b-a});
        return app.arrayVotesParty;
    },
    sortByLeastMissed: function(){
    app.arrayVotesMissed.sort(function(a, b){return a-b});
    return app.arrayVotesMissed;
    },
    sortByMostMissed: function(){
        app.arrayVotesMissed.sort(function(a, b){return b-a});
        return app.arrayVotesMissed;
    },
    membersVoteTheirParty: function(array,array2,array3, key){
        var tenPctArray = [];
        var tenPcntNum = (array.length * 10)/100;
        tenPcntNum = tenPcntNum.toFixed(0);
        console.log(tenPcntNum);

        for(var j = 0; j <tenPcntNum; j++){
            tenPctArray.push(array2[j]);
        }

        var arrayWithoutTenPct = []; 
        console.log(tenPctArray)

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

        console.log(tenPctArray.length);

        for(var s = 0; s<tenPctArray.length; s++){
            for(var l = 0; l<array.length; l++){
                if(array2[s]=== array[l][key]){
                    if(array3.indexOf(array[l])==-1){
                        array3.push(array[l]);

                    }
                }
            }
        }
        console.log(array3);
    },
    loader: function(){
        var containerLoader = document.getElementById("containerLoader");
        setTimeout(function(){
            containerLoader.classList.add("cerrar");
        },);    
    }
 } 
})
