//=require people.js
//=require listener.js
//=require model.js
//=require view.js
//=require jquery
//=require jquery_ujs

describe('the listener', function() {

  var $person1, $showButton, editForm, fakePerson; 

  beforeEach( function () {
      loadFixtures('index');
      jasmine.Clock.useMock();

      //Deals with Mock and animation incompatibilities
      jQuery.fx.off = true;
      //global variables
      $person1 = $('tr.person#1');
      $showButton = $('tr.person#1 td.drop_down'); //for person 1 
     
      editForm = "<br><form> \
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
      $editForm = $(editForm);
  });

  describe('the forClickTdShow function', function() {
    it('should listen for a click', function() {
      listen.forClickOnTdShow();
      var $click = $showButton.data('events').click[0].type;
      expect($click).toBe('click');
    });
  }); 

  describe('the forSubmitOnEditForm function', function(){
    it('should listen for a submit', function() {
      listen.forSubmitOnEditForm(1, $editForm);
      var $submit = $editForm.data('events').submit[0].type;
      expect($submit).toBe('submit');
    });
  });

  describe('the forClickOnNewButton function', function() {
    it('should listen for a click', function() {
      listen.forClickOnNewButton();
      var $newLink = $('a#new_person');
      var $click = $newLink.data('events').click[0].type;
      expect($click).toBe('click');
    });
  }); 
});
