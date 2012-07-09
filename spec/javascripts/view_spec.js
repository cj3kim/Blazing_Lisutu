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

  //slideEditForm and slideNewForm aren't tested
  //since the individual functions composing them are tested
  //
  //insertPersonRow isn't tested because it is not used to 
  //dynamically update rows with new POSTs
  //
  //The page automatically refreshes after an ajax call

  describe('the insertEditForm function', function() {
    var searchForEditForm, $editForm, $dropDownBox, $formContainer;

    beforeEach(function() {

      $editForm = $(editForm);
      viewMethods.insertEditForm($person1, $editForm);
      jasmine.Clock.tick(1000);
      $dropDownBox = $('tr.person#1n');
      $formContainer = $('div.form_box'); 
      searchForEditForm = function() {return $editForm;}
    });

    it('should insert new row', function() {
      expect(searchForEditForm()).toBeVisible(); 
    });

    it('should have an edit form inside the div.form_box', function () { 
      expect($dropDownBox).toContain($editForm);
    }); 

    it('should have div.form_box inside the new tr', function() {
      expect($dropDownBox).toContain($formContainer); 
    });
  });

  describe('the insertNewForm function', function() {
    var findNewForm, $form;

    beforeEach(function() {
      viewMethods.insertNewForm(); 
      findNewForm = function() { return $('center#new_person form');}
      $form = findNewForm();
    });

    it('should insert a form below the New Person link', function() {
      expect($form).toExist();
    });

    it('should listen for a submit', function() {
      var submit = $form.data('events').submit[0].type;
      expect(submit).toBe('submit');
    });
  }); 

  describe('the updateEditForm function', function() {

   var $editForm, fakePerson;

   beforeEach(function() {
     $editForm = $(editForm);
     fakePerson = {
       f_name:'Chris' ,
       l_name:'Kim',
       address:'Somewhere Wonderful' ,
       phone_num:'(234) 242-1234' 
     };
     viewMethods.updateEditForm($editForm, fakePerson);
   });

   it('should update the f_name value of the edit form', function() {
     var f_name = $editForm.find('#f_name').attr('value');
     expect(f_name).toBe(fakePerson.f_name);
   });
  }); 

  describe('the updatePersonRow function', function() {
    var  jsonObject;

    beforeEach(function() {
      jsonObject = {
        person: {
          f_name:'Chris' ,
          l_name:'Kim',
          address:'Somewhere Wonderful' ,
          phone_num:'(234) 242-1234' 
        }
      };

      viewMethods.updatePersonRow($person1, jsonObject);
    });

    it('should update the f_name column in the person row', function() {
      var f_name = $person1.find('#f_name').text();
      expect(f_name).toBe(jsonObject.person.f_name);
    });
  }); 

});
