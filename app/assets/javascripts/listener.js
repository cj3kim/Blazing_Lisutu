

var listen = {};

listen.forClickOnTdShow = function() { 
    

    //Listen for a click 
    $('tr td.drop_down').click( function () {
      var $personTr = $(this).parent();
      
      viewMethods.slideEditForm($personTr);

    });
}

listen.forClickOnNewButton = function() {

  $('a#new_person').click( function(event){
    event.preventDefault();
    viewMethods.slideNewForm(); 
  })
}


listen.forSubmitOnEditForm = function ( personId, $editForm) {

  $editForm.submit( function(event) {
    var $personRow = $('tr.person#' + personId);

    event.preventDefault();

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


    alert('You\'ve updated this person');
  }); 
} 

listen.forSubmitOnNewForm = function ($newForm) {

  $newForm.submit( function(event) {
    event.preventDefault();

    var newPersonData = {
      person: {
        f_name: $newForm.find('#f_name').attr('value'),
        l_name: $newForm.find('#l_name').attr('value'),
        address: $newForm.find('#address').attr('value'),
        phone_num: $newForm.find('#phone_num').attr('value'),
      },
    };

    modelMethods.postNewPerson(newPersonData);

    $newForm.parent().slideToggle( 500, function() {
          window.location.reload()
      }
    );
  });
}
