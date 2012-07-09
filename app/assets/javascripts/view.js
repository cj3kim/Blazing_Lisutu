var personForm = "<br><form> \
                  <label>First Name</label>  \
                  <input  class='edit_form' id='f_name' type='text' value=''></input> <br><br>  \
                  <label>Last Name</label>  \
                  <input  class='edit_form' id='l_name' type='text' value=''></input> <br><br>  \
                  <label>Address</label>  \
                  <input  class='edit_form' id='address' type='text' value=''></input> <br><br> \
                  <label>Phone Number</label>  \
                  <input  class='edit_form' id='phone_num' type='text' value=''></input> <br><br> \
                  <input type='submit'></input> \
               </form> <br> ";  

var newRow  = "<tr class='person' id=''> \
                <td id='f_name'> </td> \
                <td id='l_name'> </td> \
                <td id='address'> </td> \
                <td id='phone_num'> </td> \
                <td> Delete </td> \
                <td class='drop_down'> Show </td> \
              </tr>";

var viewMethods = {};

viewMethods.slideEditForm = function ($personTr) {

  var personId = $personTr.attr('id');
  var $editForm = $(personForm);

  if ($personTr.next().find('div.form_box').length === 0) {

    this.insertEditForm($personTr, $editForm);

    //getPerson here
    var personData = modelMethods.getPerson(personId); 

    //update form here 
    this.updateEditForm($editForm, personData)

    //place listener on form
    listen.forSubmitOnEditForm( personId, $editForm);

    //Slide down form
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

  if ($('center div.form_box').length === 0) {
    this.insertNewForm();
    $('center div.form_box').hide().slideDown(800);

  } else {
      $('center div.form_box').slideToggle(800, function() {
          $(this).remove();
      }); 
  }
}
               
viewMethods.insertPersonRow = function(data) {

  var $newRow = $(newRow);
  $newRow.find('#f_name').text(data.person.f_name);
  $newRow.find('#l_name').text(data.person.l_name);
  $newRow.find('#address').text(data.person.address);
  $newRow.find('#phone_num').text(data.person.phone_num);
  $('table').append($newRow);

}

viewMethods.insertEditForm =  function($personTr, $editForm) {

    var personId = $personTr.attr('id');
    var newSibTr = '<tr class=\'person\' id=\'' + personId + 'n\'><td colspan=6> <div class=\'form_box\'></div></td></tr>';

    $personTr.after(newSibTr);

    $formContainer = $personTr.next().find('div.form_box');
    $formContainer.append($editForm);
};

viewMethods.insertNewForm = function() {
    
    var $newForm = $(personForm);
    var $formContainer = $('<div class=\'form_box\'></div>');   
    $('center').append($formContainer); 
    $('center div.form_box').append($newForm);

    listen.forSubmitOnNewForm($newForm);
}


viewMethods.updateEditForm = function (callback, data) {
    callback.find('#f_name').attr('value', data.f_name); 
    callback.find('#l_name').attr('value', data.l_name); 
    callback.find('#address').attr('value', data.address); 
    callback.find('#phone_num').attr('value', data.phone_num); 
}

viewMethods.updatePersonRow = function (callback, data) {
    callback.find('#f_name').text(data.person.f_name); 
    callback.find('#l_name').text(data.person.l_name);
    callback.find('#address').text(data.person.address); 
    callback.find('#phone_num').text(data.person.phone_num); 
}

