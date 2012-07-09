//=require people.js
//=require listener.js
//=require model.js
//=require view.js
//=require jquery
//=require jquery_ujs

describe('the listener functions', function() {

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
    });

  describe('forClickTdShow', function() {

    it('should open and close', function() {

      $editForm = $(editForm);

      var searchForEditForm = function() {
        return $('tr.person#1n form'); 
      }

      viewMethods.insertEditForm($person1, $editForm);
      jasmine.Clock.tick(200);
      expect(searchForEditForm()).toBeVisible(); 

      searchForEditForm().remove(); 
      jasmine.Clock.tick(200);
      expect(searchForEditForm()).not.toExist(); 
    }); 
  }); 

  describe('forSubmitOnEditForm', function(){

   
  });
});
