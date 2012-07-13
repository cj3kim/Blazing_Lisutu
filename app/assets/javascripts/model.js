
//modelMethods provides four different methods which
//create, read, update, and delete database rows.
var modelMethods = {};


//Returns personData from the database based on a person identifier
modelMethods.getPerson = function (personId) { 

  //Declares a person variable but does not assign
  var personData; 
 
  $.ajax({
    url: "/people/" + personId ,
    type:"GET",
    contentType: "application/json; charset=utf-8", 
    dataType: "JSON",
    //Async needs to be set to false or ajax will not assign
    //jsonData to personData
    async: false,
    success: function(jsonData) {
      personData = jsonData;
    } 
  });

  return personData; 
};

//Updates person data in the database based on a person identifier.
//It returns the data used to update the db afterward.
modelMethods.updatePerson =  function (personId, data ) {
  
  $.ajax({
    url: "/people/" + personId,
    type: "PUT",
    data: data, 
    //Async needs to be set to false or ajax will not assign
    //jsonData to personData
    async: false, 
    dataType: "JSON", 
  });

  return data; 
};
//Posts new person data in the database. Returns data used to post it. 
modelMethods.postNewPerson = function (data) {
  
  $.ajax({
    url: "/people/",
    type: "POST",
    data: data, 
    //Async needs to be set to false or ajax will not assign
    //jsonData to personData
    async: false, 
    dataType: "JSON", 
    success: function(jsonData) {
    }
  });
  return data;
}

//This app uses rails Delete method 
//Not used in project but here for proof of concept
modelMethods.deletePerson = function (personId) { 
  $.ajax({
      url: "/people/" + personId, 
      type: "DELETE",
      dataType: "JSON" 
    }
  );
}

//Helper function which puts data into a format rails will accept.
//The callback is either an edit or new form
//The 
//GET requests return data as so:
//
//data = {         This does not work. Rails wants data properties 
//  f_name: '',    (f_name,l_name,address,phone_num) to be the properties
//  l_name: '',     of a person object for POST and PUT requests.
//  address: '',
//  phone_num: ''
//}

var railsPutPostData = function(callback) {
  var data = {};
  data.person = {
    f_name: callback.find('input.f_name').attr('value'),
    l_name: callback.find('input.l_name').attr('value'),
    address: callback.find('input.address').attr('value'),
    phone_num: callback.find('input.phone_num').attr('value'),
  };
  return data;
}


