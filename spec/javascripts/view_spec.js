//=require people.js
//=require listener.js
//=require model.js
//=require view.js
//=require jquery
//=require jquery_ujs


describe('the view functions', function() {

  var $person1,$showButton, editForm, fakePerson; 

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

      //fake JSON object
      fakePerson = {
        f_name:'Chris' ,
        l_name:'Kim',
        address:'Somewhere Wonderful' ,
        phone_num:'(234) 242-1234' 
      }

  });

  describe('the index page', function() {
    it('should be tr.person#1. The name is Christopher.', function() {
      var $firstName = $('tr.person#1').children().first().text();
      expect($firstName).toBe('Christopher');
    });

    it('should contain td.drop_down', function () {
      expect($person1).toContain('td.drop_down');
    });

    it('should insert new row and nested div, hide it, then slide open', function() {

      //produces GET 404 error
      viewMethods.insertEditForm($person1);
      jasmine.Clock.tick(200);

      var $editForm = $('tr.person#1');
      expect($editForm).toExist();

      $editForm.hide();
      jasmine.Clock.tick(200);
      expect($editForm).toBeHidden();

      $editForm.slideDown(200);
      jasmine.Clock.tick(300);

      expect($editForm).toBeVisible();

    });

    it('should have div.form_box inside the new tr', function() {

      viewMethods.insertEditForm($person1);
      jasmine.Clock.tick(300); 

      $newSibTr = $('tr.person#1n');
      $formContainer = $('div.form_box'); 

      expect($newSibTr).toContain($formContainer); 
    });
  });
     

  describe('the insertEditForm function', function() {
    it('should have an edit form inside the div.form_box', function () { 
      $editForm = $(editForm);

      viewMethods.insertEditForm($person1, $editForm);
      jasmine.Clock.tick(300); 
      $newSibTr = $('tr.person#1n');

      expect($newSibTr).toContain($editForm);
    }); 
  });
});
