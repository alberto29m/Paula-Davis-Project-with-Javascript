
//var allMembers;
var app = new Vue({
  el: '#appsenatehouse',
  data: {
        name: "",
        allMembers:[],
        allMembers2:[],
        newMembersArray:[],
        newMembersState: []
  },
    created: function() {
        this.getData();
    },
    methods:{
    getData: function(){
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
            app.loader();
            app.allMembers = json.results[0].members;
            app.allMembers2 = json.results[0].members;
            
            document.getElementById("checkboxes").onchange = function () {
            app.checkboxesFilter();};

            app.createDropdownMenu();
//            document.getElementById("dropdownMenu").onchange = function () {
//            app.filterByDropdownMenu();};

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
            app.loader();
            
            app.allMembers = json.results[0].members;
            app.allMembers2 = json.results[0].members;
            
            document.getElementById("checkboxes").onchange = function () {
                app.checkboxesFilter();};
            app.createDropdownMenu();

            document.getElementById("dropdownMenu").onchange = function () {
                app.filterByDropdownMenu();};


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
    checkboxesFilter: function(){
        app.newMembersArray = [];
        app.allMembers2 = app.allMembers;
        var checkedBoxes = document.querySelectorAll('input[name=myCheck]:checked');
        //checkBoxes = es un array con los IDs de los checkboxes que estén checkeados.
        var newArray = [];
        var select = document.getElementById("dropdownMenu");
        var selectedValue = dropdownMenu.options[dropdownMenu.selectedIndex].value;
 
        for (var i = 0; i < checkedBoxes.length; i++) {
            newArray.push(checkedBoxes[i].value);
        }
        console.log(newArray);
        for(var i=0; i< newArray.length; i++){
                for(var j = 0; j<  app.allMembers2.length; j++){
                    if( (app.allMembers2[j].party == newArray[i]) && (app.allMembers2[j].state === selectedValue)){
                        app.newMembersArray.push( app.allMembers2[j]);
                    }else if((app.allMembers2[j].party == newArray[i]) && (selectedValue == "all")){
                        app.newMembersArray.push(app.allMembers2[j]);
                    }
                }
        }
        app.allMembers2 = app.newMembersArray;
        console.log(app.newMembersArray)
        return app.newMembersArray;
    },
    updateTable : function(){
//        app.removeTable();
        app.checkboxesFilter();
    },
    makeNewArray: function(){
        var arrayOptions=[];

        for (i = 0; i < app.allMembers.length; i++){
            if(arrayOptions.indexOf(app.allMembers[i].state)=== -1){    
            arrayOptions.push(app.allMembers[i].state);
            }
        }
        arrayOptions.sort();                
        return arrayOptions;
    },
    createDropdownMenu: function(){
        var select = document.getElementById("dropdownMenu");
        var options1 = app.makeNewArray();
        for (var i = 0; i<options1.length ; i++){
            var  option = document.createElement("option");
            option.textContent =options1[i]; 
            select.appendChild(option);
            option.setAttribute("value", options1[i]);
        }
    },
    filterByDropdownMenu: function(){
        app.newMembersState = [];
        console.log(selectedValue)
//        var options1 = app.makeNewArray();
        var select = document.getElementById("dropdownMenu");
        var selectedValue = dropdownMenu.options[dropdownMenu.selectedIndex].value;
        console.log(selectedValue);
        for(var j = 0; j<  app.allMembers.length; j++){
            if( app.allMembers[j].state === selectedValue){
                app.newMembersState.push( app.allMembers[j]);
            }else if (selectedValue === "all"){
                app.newMembersState.push( app.allMembers[j]);            }
        }
        app.allMembers2 = app.newMembersState;
        console.log(app.newMembersState)
        return app.newMembersState;
    },
    loader: function(){
        var containerLoader = document.getElementById("containerLoader");
//        setTimeout(function(){
            containerLoader.classList.add("cerrar");
//        },);    
    }
        
    }
})
