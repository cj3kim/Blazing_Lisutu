
// String representation of a generic person form
// Could be used as an edit or new form
var personForm = "<form><br /> \
                  <label>First Name</label>  \
                  <input  class='f_name' type='text' value=''></input> <br><br>  \
                  <label>Last Name</label>  \
                  <input  class='l_name' type='text' value=''></input> <br><br>  \
                  <label>Address</label>  \
                  <input  class='address' type='text' value=''></input> <br><br> \
                  <label>Phone Number</label>  \
                  <input  class='phone_num' type='text' value=''></input> <br><br> \
                  <input type='submit'></input> <br /> \
                  </form>";  

//dropDownBox is  string representation of a row for editing 
//the selected person
var dropDownBox = "<tr class='person' id='' + personId + 'n'><td colspan=6> <div class='form_box'></div></td></tr>";

//The view helper object. It interacts with the view (the DOM Tree)
//to make changes.
var viewHelper = {};

//Slides down an edit form
viewHelper.slideEditForm = function ($personTr) {

  //Deduce personId from $personTr
  var personId = $personTr.attr('id');
  //Encapsulates a personForm into a jQuery object
  var $editForm = $(personForm);
  
  //If the div, which contains the form, is empty, insert an
  //edit form into the div. 
  if (findEditFormContainer($personTr).length === 0) {

    //Make a GET request for person data
    var personData = modelMethods.getPerson(personId); 

    //Insert an edit row after the personTr and then insert an edit form
    this.insertEditForm($personTr, $editForm);
    //Insert person data from the GET request in the form
    this.updateForm($editForm, personData)
    //Place an the submit handler on the edit form
    viewController.forSubmitOnEditForm( personId, $editForm);

    findEditFormContainer($personTr).hide().slideDown(800);

  } else {
      var $dropDownBox = $personTr.next(); 
      var $divInDropDownBox = $dropDownBox.find('div.form_box');

      $divInDropDownBox.slideToggle(800, function() {
          $dropDownBox.remove();
      }); 
  }
}

viewHelper.slideNewForm = function() {

  if (findNewFormContainer().length === 0) {

    this.insertNewForm(); 
    findNewFormContainer().hide().slideDown(800);

    viewController.forSubmitOnNewForm(findNewForm());

  } else {
      findNewFormContainer().slideToggle(800, function() {
          $(this).remove();
      }); 
  }
}


viewHelper.insertEditForm =  function($personTr, $editForm) {

  var personId = $personTr.attr('id');
  var dropDownBox = "<tr class='person' id='' + personId + 'n'> \
                    <td colspan=6> <div class='form_box'></div></td></tr>";

  $personTr.after(dropDownBox);

  $formContainer = $personTr.next().find('div.form_box');
  $formContainer.append($editForm);
};

viewHelper.insertNewForm = function() {

    var $newForm = $(personForm);
    var $newPersonSection = $('center#new_person');
    var $formContainer = $("<div class='form_box'></div>");   

    $newPersonSection.append($formContainer); 
    $formContainer.append($newForm);
}


viewHelper.updateForm = function (callback, data) {
    callback.find('input.f_name').attr('value', data.f_name); 
    callback.find('input.l_name').attr('value', data.l_name); 
    callback.find('input.address').attr('value', data.address); 
    callback.find('input.phone_num').attr('value', data.phone_num); 
}

viewHelper.updatePersonRow = function (callback, data) {
    callback.find('#f_name').text(data.person.f_name); 
    callback.find('#l_name').text(data.person.l_name);
    callback.find('#address').text(data.person.address); 
    callback.find('#phone_num').text(data.person.phone_num); 
}

function findEditForm($personTr) {
    return $personTr.next().find('form');
}
function findEditFormContainer($personTr) {
    return $personTr.next().find('div.form_box');
}
function findNewFormContainer() {
  return $('center#new_person div.form_box');
}
function findNewForm() {
  return $('center#new_person form'); 
}

