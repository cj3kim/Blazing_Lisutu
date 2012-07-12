

var listen = {};

listen.forClickOnTdShow = function() { 
  //Listen for a click 
  
  var $allShowColumns = $('tr td.drop_down');

  $allShowColumns.click( function () {

    //References parent tr
    var $personRow = $(this).parent(); 

    viewMethods.slideEditForm($personRow);

  });
}

listen.forClickOnNewButton = function() {

  //References the new parent link at the bottom of the page
  var $newPersonLink = $('a#new_person'); 

  $newPersonLink.click( function(event){
    event.preventDefault();
    viewMethods.slideNewForm(); 
  })
}


listen.forSubmitOnEditForm = function ( personId, $editForm) {

  $editForm.submit( function(event) {
    event.preventDefault();

    var $personRow = $('tr.person#' + personId);

    var currentPersonData = {
      person: {
        f_name: $editForm.find('#f_name').attr('value'),
        l_name: $editForm.find('#l_name').attr('value'),
        address: $editForm.find('#address').attr('value'),
        phone_num: $editForm.find('#phone_num').attr('value'),
      },
    }
    var newPersonData = modelMethods.updatePerson(personId, currentPersonData); 

    viewMethods.updatePersonRow($personRow, newPersonData)
  }); 
} 

listen.forSubmitOnNewForm = function ($newForm) {

  $newForm.submit( function(event) {
    event.preventDefault();

    var newPersonData = dataLoader($newForm); 

    modelMethods.postNewPerson(newPersonData);

    $newForm.parent().slideToggle( 500, function() {
          window.location.reload()
      }
    );
  });
}

var dataLoader = function(callback) {
  var data = {};
  data.person = {
    f_name: callback.find('#new_f_name').attr('value'),
    l_name: callback.find('#new_l_name').attr('value'),
    address: callback.find('#new_address').attr('value'),
    phone_num: callback.find('#new_phone_num').attr('value'),
  };
  return data;
}
