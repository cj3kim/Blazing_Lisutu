

var Listener = function () {}

Listener.prototype.forClickTdShow = function() { 
    
    //**Better to name the function to describe what the function does 
    //**What function is the td serving

    //Listen for a click 
    $('tr td.drop_down').click( function () {
      var $personTr = $(this).parent();
      var viewMethods = new View();
      
      viewMethods.slideEditForm($personTr);

    });
}

Listener.prototype.forClickOnNewButton = function() {

  var viewMethods = new View(); 

  $('center a#new_person').click( function(event){
    event.preventDefault();
    viewMethods.slideNewForm(); 
  })
}


Listener.prototype.forSubmitOnEditForm = function ( personId, $editForm) {

  $editForm.submit( function(event) {
    var modelMethods = new Model(); 
    var viewMethods = new View(); 
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

Listener.prototype.forSubmitOnNewForm = function ($newForm) {

  var modelMethods = new Model();
  var viewMethods = new View();

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
