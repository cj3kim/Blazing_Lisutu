//=require people.js
//=require listener.js
//=require model.js
//=require view.js
//=require jquery
//=require jquery_ujs


describe('the view functions', function() {

  var $person1,$showButton, editForm; 

  beforeEach( function () {
      loadFixtures('index');
      jasmine.Clock.useMock();

      //Deals with Mock and animation incompatibilities
      jQuery.fx.off = true;

      $person1 = $('tr.person#1');
      $showButton = $('tr.person#1 td.drop_down'); //for person 1 
      editForm = "<form> \
                      <label>First Name</label>  \
                      <input  class='edit_form' id='f_name' type='text' value=''></input> <br><br>  \
                      <label>Last Name</label>  \
                      <input  class='edit_form' id='l_name' type='text' value=''></input> <br><br>  \
                      <label>Address</label>  \
                      <input  class='edit_form' id='address' type='text' value=''></input> <br><br> \
                      <label>Phone Number</label>  \
                      <input  class='edit_form' id='phone_num' type='text' value=''></input> <br><br> \
                      <input type='submit'></input> \
                    </form> ";  

      });

  describe('the first person', function() {
    it('should be tr.person#1. The name is Christopher.', function() {
      var $firstName = $person1.children().first().text();
      expect($firstName).toBe('Christopher');
    });

    it('should contain td.drop_down', function () {
      expect($person1).toContain($showButton);
    });

  });
     



  describe('the slideNewForm function', function() {
  
  });

  describe('the insertPersonRow function', function() {
    
  }); 

  describe('the insertEditForm function', function() {
    beforeEach(function() {
      var $editForm = $(editForm);
      var searchForEditForm = function() {return $editForm;}
      var $dropDownBox = $('tr.person#1n');
      var $formContainer = $('div.form_box'); 

      viewMethods.insertEditForm($person1, $editForm);
    });

    it('should insert new row', function() {
      jasmine.Clock.tick(200);
      expect(searchForEditForm()).toBeVisible(); 
    });

    it('should have an edit form inside the div.form_box', function () { 
      jasmine.Clock.tick(300); 
      expect($dropDownBox).toContain($editForm);
    }); 

    it('should have div.form_box inside the new tr', function() {
      jasmine.Clock.tick(300); 
      expect($dropDownBox).toContain($formContainer); 
    });
  });

  describe('the insertNewForm function', function() {
    
  }); 

  describe('the updateEditForm function', function() {
    
  }); 

  describe('the updatePersonRow function', function() {
    
  }); 

});
