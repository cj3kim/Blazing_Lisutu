
//=require people.js
//=require listener.js
//=require model.js
//=require view.js
//=require jquery
//=require jquery_ujs

describe('the model', function () {
  var modelMethods, viewMethods, listen, $person1, 
      $showButton, editForm, fakePerson; 

  beforeEach( function () {
      loadFixtures('index');
      jasmine.Clock.useMock();

      //Deals with Mock and animation incompatibilities
      jQuery.fx.off = true;

      //global functions 
      modelMethods = new Model();
      viewMethods = new View();
      listen = new Listener();

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

  describe('the getPerson function', function () {

    it('should have json data loaded in edit form values', function() {

       spyOn($, 'ajax'); 

       modelMethods.getPerson(1);

       var getPersonArgs = $.ajax.argsForCall;
       var successCallback = getPersonArgs[0][0].success;

       successCallback = jasmine.createSpy('success mock')
                                .andCallFake( function (fakePerson) {
                                  return fakePerson;  
                                });

       var personData = successCallback(fakePerson);

       var f_name = personData.f_name;
       var l_name = personData.l_name;
       var address = personData.address;
       var phone_num = personData.phone_num;

       expect(f_name).toBe(fakePerson.f_name);
       expect(l_name).toBe(fakePerson.l_name);
       expect(address).toBe(fakePerson.address);
       expect(phone_num).toBe(fakePerson.phone_num);
    }); 

    it('should let getPerson to be called', function() {

      modelMethods.getPerson = jasmine.createSpy('getPerson stub');
      modelMethods.getPerson(1); 

      expect(modelMethods.getPerson).toHaveBeenCalled(); 
    });

    it('getPerson should make a GET request to the correct URL', function() {
       spyOn($, 'ajax'); 
       modelMethods.getPerson(1);
       expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("/people/1");
       expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("GET");
    });

  });

  describe('the updatePerson function', function () {

    it('updatePerson should be a PUT request', function() {
      spyOn($,'ajax');
      modelMethods.updatePerson(1);
      //refactor this code 
      expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("PUT");
    });

    it('should update data', function(){ 

      spyOn($,'ajax');
      modelMethods.updatePerson(1, fakePerson)
      var getPersonArgs = $.ajax.argsForCall;
      var data = getPersonArgs[0][0].data;

      expect(fakePerson.f_name).toBe('Chris');
      expect(fakePerson.l_name).toBe('Kim');
      expect(fakePerson.address).toBe('Somewhere Wonderful');
      expect(fakePerson.phone_num).toBe('(234) 242-1234');

    }); 

  });

});
