
var modelMethods = {};

modelMethods.getPerson = function (personId) { 

  var personData; 
 
  $.ajax({
    type:"GET",
    url: "/people/" + personId ,
    contentType: "application/json; charset=utf-8", 
    dataType: "JSON",
    async: false,
    success: function(jsonData) {
      personData = jsonData;
    } 
  });

  return personData; 
};

modelMethods.updatePerson =  function (personId, data, callback ) {
  
  $.ajax({
    type: "PUT",
    url: "/people/" + personId,
    data: data, 
    async: false, 
    dataType: "JSON", 
  });

  return data; 
};

modelMethods.postNewPerson = function (data) {

  $.ajax({
    type: "POST",
    url: "/people/",
    data: data, 
    async: false, 
    dataType: "JSON", 
    success: function() {

    }
  });
}

modelMethods.deletePerson = function (personId) { 

  var confirmation = confirm("Are you sure?");

  if ( confirmation === true) {
    $.ajax({
        type: "DELETE",
        url: "/people/" + id, 
        dataType: "JSON" 
      }
    );
  }
}



