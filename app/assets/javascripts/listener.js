

var viewController = {};

viewController.forClickOnTdShow = function() { 
  //viewController for a click 
  var $allShowColumns = $('tr td.drop_down');
  $allShowColumns.click( function () {

  var $personRow = $(this).parent(); 
  viewHelper.slideEditForm($personRow);

  });
}

viewController.forClickOnNewButton = function() {

  //References the new parent link at the bottom of the page
  var $newPersonLink = $('a#new_person'); 

  $newPersonLink.click( function(event){
    event.preventDefault();
    viewHelper.slideNewForm(); 
  })
}


viewController.forSubmitOnEditForm = function ( personId, $editForm) {

  $editForm.submit( function(event) {
    event.preventDefault();

    var $personRow = $('tr.person#' + personId);
    var currentPersonData = railsPutPostData($editForm); //load current person data
    var newPersonData = modelMethods.updatePerson(personId, currentPersonData); //Updates person and returns results

    viewHelper.updatePersonRow($personRow, newPersonData) //Updates row 
  }); 
} 

viewController.forSubmitOnNewForm = function ($newForm) {

  $newForm.submit( function(event) {
    event.preventDefault();

    var newPersonData = railsPutPostData($newForm); 

    modelMethods.postNewPerson(newPersonData);

    $newForm.parent().slideToggle( 500, function() {
          window.location.reload()
      }
    );
  });
}


