
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
var dropDownBox = "<tr class='edit_row'><td colspan=6> <div class='form_box'></div></td></tr>";

//The view helper object. It interacts with the view (the DOM Tree)
//to make changes.
var viewHelper = {};

//Slide up/down an edit form
viewHelper.slideEditForm = function ($personTr) {

  //Deduce personId from $personTr
  var personId = $personTr.attr('id');
  //Encapsulates a personForm into a jQuery object
  var $editForm = $(personForm);
  
  //If a form count inside the form div is 0, insert a form
  if (findEditFormContainer($personTr).length === 0) {


    //Make a GET request for person data
    var personData = modelMethods.getPerson(personId); 
    //Insert an edit row after the personTr and then insert an edit form
    this.insertEditForm($personTr, $editForm);
    //Insert person data from the GET request in the form
    this.updateForm($editForm, personData)
    //Place an the submit handler on the edit form
    viewController.forSubmitOnEditForm( personId, $editForm);
    //Find the edit form container, hide it, and slide it down.
    //this function is defined after the view methods
    findEditFormContainer($personTr).hide().slideDown(800);

  } else { //if form count is not 0, find a form and slide it up 
      slideUpAndRemove(findEditFormContainer($personTr));
  }
}

//Slide up/down a new form
viewHelper.slideNewForm = function() {

  //If a form count inside the form div is 0, insert a form
  if (findNewFormContainer().length === 0) {

    //Insert a new form 
    this.insertNewForm(); 

    //hide the form and slide it down
    findNewFormContainer().hide().slideDown(800);

    //Attach the submit listener/handler to the new form
    viewController.forSubmitOnNewForm(findNewForm());

  } else { //if form count is not 0, find the form and slide it up
      //this function is defined after the view methods
      slideUpAndRemove(findNewFormContainer()); 
  }
}


viewHelper.insertEditForm =  function($personTr, $editForm) {

  //Declare and assign person id 
  var personId = $personTr.attr('id');
  var editRow = "<tr class='person' id='' + personId + 'n'> \
                    <td colspan=6> <div class='form_box'></div></td></tr>";

  //Insert edit row after the person row
  $personTr.after(editRow);

  //Insert edit form inside the form container
  //this function is detailed after the view methods
  findEditFormContainer($personTr).append($editForm);
};

//Insert a new form at the bottom of the page
viewHelper.insertNewForm = function() {

    //Declare a form
    var $newForm = $(personForm);
    //find the form the center element 
    var $newPersonSection = $('center#new_person');
    // encapsulated a div with class: 'form_box'
    var $formContainer = $("<div class='form_box'></div>");   
    //Insert into center element a form container
    $newPersonSection.append($formContainer); 
    //Insert into form container a form
    $formContainer.append($newForm);
}


//Purpose is to fill the edit form with person information
//when the edit form slides down. The callback is generally
//an edit form.
viewHelper.updateForm = function (callback, data) {
    callback.find('input.f_name').attr('value', data.f_name); 
    callback.find('input.l_name').attr('value', data.l_name); 
    callback.find('input.address').attr('value', data.address); 
    callback.find('input.phone_num').attr('value', data.phone_num); 
}

//Purpose is to dynamically update person rows with new data.
//The callback generally is an person row.
viewHelper.updatePersonRow = function (callback, data) {
    callback.find('td.f_name').text(data.person.f_name); 
    callback.find('td.l_name').text(data.person.l_name);
    callback.find('td.address').text(data.person.address); 
    callback.find('td.phone_num').text(data.person.phone_num); 
}

//finds an edit form after a person row
function findEditForm($personTr) {
    return $personTr.next().find('form');
}
//finds an a form container after a person row
function findEditFormContainer($personTr) {
    return $personTr.next().find('div.form_box');
}
//finds a new person form container at inside the center element
function findNewFormContainer() {
  return $('center#new_person div.form_box');
}
//finds a new person form inside the center element
function findNewForm() {
  return $('center#new_person form'); 
}

//Take a form callback (edit or new) and sets the display
//attribute to hidden. It then removes it. 
function slideUpAndRemove(callback) {
  callback.slideToggle(800, function() {
      //form container is removed after it has slid up
      $(this).remove();
  }); 

}

