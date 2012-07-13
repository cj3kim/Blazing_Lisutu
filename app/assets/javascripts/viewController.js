

var viewController = {};

viewController.forClickOnTdShow = function() { 

  //Searches form elements with passed in characteristics
  var $allShowColumns = $('tr td.drop_down');

  //Listens for a click on the columns with drop_down class.
  $allShowColumns.click( function () {
    var $personRow = $(this).parent(); 
    //Slide down the edit form. 
    viewHelper.slideEditForm($personRow);
  });
}

viewController.forClickOnNewButton = function() {

  //Searches form elements with passed in characteristics
  var $newPersonLink = $('a#new_person'); 

  //Listens for a click on the new person link at the bottom
  //of the address book
  $newPersonLink.click( function(event){
    //Default action of the submit event is prevented
    event.preventDefault();

    //Slide down the new form
    viewHelper.slideNewForm(); 
  })
}


viewController.forSubmitOnEditForm = function ( personId, $editForm) {

  $editForm.submit( function(event) {
    //Default action of the submit event is prevented
    event.preventDefault();

    //Searches form elements with passed in characteristics
    var $personRow = $('tr.person#' + personId);

    //Takes values from form and place them in currentPersonData
    //in a format Rails can accept. 
    var currentPersonData = railsPutPostData($editForm); 

    //Submit current person values and return the new person values
    var newPersonData = modelMethods.updatePerson(personId, currentPersonData);

    //Dynamically updates the passed in person row with new person data 
    viewHelper.updatePersonRow($personRow, newPersonData);
  }); 
} 

viewController.forSubmitOnNewForm = function ($newForm) {

  //Find the div containing the form
  $formContainer = findNewFormContainer();

  //Listens for a submit on the new form
  $newForm.submit( function(event) {
    //Default action of the submit event is prevented
    event.preventDefault();

    //Takes values from form and place them in currentPersonData
    //in a format Rails can accept. 
    var newPersonData = railsPutPostData($newForm); 

    //Post current person data to Rails with ajax 
    modelMethods.postNewPerson(newPersonData);

    //Take half a second to slideUp(hide) the div and refresh the page
    $formContainer.slideToggle( 500, function() {
          window.location.reload()
      }
    );
  });
}


