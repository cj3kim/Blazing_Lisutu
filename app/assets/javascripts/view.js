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

var newRow  = "<tr class='person' id=''> \
                <td id='f_name'> </td> \
                <td id='l_name'> </td> \
                <td id='address'> </td> \
                <td id='phone_num'> </td> \
                <td> Delete </td> \
                <td class='drop_down'> Show </td> \
              </tr>";

var dropDownBox = "<tr class='person' id='' + personId + 'n'><td colspan=6> <div class='form_box'></div></td></tr>";

var viewMethods = {};

viewMethods.slideEditForm = function ($personTr) {

  var personId = $personTr.attr('id');
  var $editForm = $(personForm);
  
  function findEditFormContainer() {
    return $personTr.next().find('div.form_box');
  }

  if (findEditFormContainer().length === 0) {

    var personData = modelMethods.getPerson(personId); 

    
    this.insertEditForm($personTr, $editForm);// insert edit form
    this.updateForm($editForm, personData)//update edit form

    listen.forSubmitOnEditForm( personId, $editForm);

    var $dropDownBox = $personTr.next(); //I know this smells!

    var $divInDropDownBox = $dropDownBox.find('div.form_box');
    $divInDropDownBox.hide().slideDown(800);

  } else {
      var $dropDownBox = $personTr.next(); 
      var $divInDropDownBox = $dropDownBox.find('div.form_box');

      $divInDropDownBox.slideToggle(800, function() {
          $dropDownBox.remove();
      }); 
  }
}

viewMethods.slideNewForm = function() {


  function findNewFormContainer() {
    return $('center#new_person div.form_box');
  }

  if (findNewFormContainer().length === 0) {

    var callback = [listen.forSubmitOnNewForm, listen];
    this.insertNewForm(callback);
    findNewFormContainer().hide().slideDown(800);

  } else {
      findNewFormContainer().slideToggle(800, function() {
          $(this).remove();
      }); 
  }
}

viewMethods.insertRow = function($personTr) {

  //Insert row should contain callbacks

  var personId = $personTr.attr('id');
  var basicRow = $("<tr></tr>");

  $personTr.after(basicRow);
  
}

viewMethods.insertEditForm =  function($personTr, $editForm) {

  var personId = $personTr.attr('id');
  var dropDownBox = "<tr class='person' id='' + personId + 'n'><td colspan=6> <div class='form_box'></div></td></tr>";

  $personTr.after(dropDownBox);

  $formContainer = $personTr.next().find('div.form_box');
  $formContainer.append($editForm);
};

viewMethods.insertNewForm = function() {

    var $args = $(this.insertNewForm.arguments); //Declare args
    var callbacks = $args;

    var $newForm = $(personForm);
    var $newPersonSection = $('center#new_person');
    var $formContainer = $("<div class='form_box'></div>");   

    $newPersonSection.append($formContainer); 
    $formContainer.append($newForm);

    for (var i = 0; i <= callbacks.length; i++) {
      //Check if a callback is an array
      switch (typeof callbacks[i]) {
        case "object": 
          var ary = callbacks[i];
          var objMethod = ary[0];
          var callbackObject = ary[1];
          objMethod.call(callbackObject, $newForm);
          break;
        case "function":
          var callbackFunction = callbacks[i];
          callbackFunction($newForm);
          break;
        default: 
          break;
      }
    }
}


viewMethods.updateForm = function (callback, data) {
    callback.find('input.f_name').attr('value', data.f_name); 
    callback.find('input.l_name').attr('value', data.l_name); 
    callback.find('input.address').attr('value', data.address); 
    callback.find('input.phone_num').attr('value', data.phone_num); 
}

viewMethods.updatePersonRow = function (callback, data) {
    callback.find('#f_name').text(data.person.f_name); 
    callback.find('#l_name').text(data.person.l_name);
    callback.find('#address').text(data.person.address); 
    callback.find('#phone_num').text(data.person.phone_num); 
}



