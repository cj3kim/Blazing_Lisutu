
var modelMethods = {};

modelMethods.getPerson = function (personId) { 

  var personData; 
 
  $.ajax({
    url: "/people/" + personId ,
    type:"GET",
    contentType: "application/json; charset=utf-8", 
    dataType: "JSON",
    async: false,
    success: function(jsonData) {
      personData = jsonData;
    } 
  });

  return personData; 
};

modelMethods.updatePerson =  function (personId, data ) {
  
  $.ajax({
    url: "/people/" + personId,
    type: "PUT",
    data: data, 
    async: false, 
    dataType: "JSON", 
  });

  return data; 
};

modelMethods.postNewPerson = function (data) {
  
  $.ajax({
    url: "/people/",
    type: "POST",
    data: data, 
    async: false, 
    dataType: "JSON", 
    success: function(jsonData) {
    }
  });
  return data;
}

modelMethods.deletePerson = function (personId) { 
  $.ajax({
      url: "/people/" + personId, 
      type: "DELETE",
      dataType: "JSON" 
    }
  );
}

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


