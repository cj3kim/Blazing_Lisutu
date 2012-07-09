
//=require people.js
//=require listener.js
//=require model.js
//=require view.js
//=require jquery
//=require jquery_ujs

describe('the model', function () {
  //function variables

  var createFakeSuccess, getPersonArgs, successCallback;

  var $person1,$showButton, editForm, fakePerson; 

  beforeEach( function () {
     loadFixtures('index');
     jasmine.Clock.useMock();

     createFakeSuccess = function () {
        getPersonArgs = $.ajax.argsForCall;
        getPersonArgs[0][0].success = jasmine.createSpy('success mock')
                                             .andCallFake( function (fakePerson) {
                                                              return fakePerson;  
                                       });
        successCallback = getPersonArgs[0][0].success;
     }
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

  describe('the getPerson function', function () {

    it('should successfully be called', function() {

      modelMethods.getPerson = jasmine.createSpy('getPerson stub');
      modelMethods.getPerson(1); 

      expect(modelMethods.getPerson).toHaveBeenCalled(); 
    });

    it('should be a GET request', function() {
       spyOn($, 'ajax'); 
       modelMethods.getPerson(1);
       expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("GET");
    });

    it('should return GET data', function() {

       spyOn($, 'ajax'); 

       modelMethods.getPerson(1);

       createFakeSuccess();
       var personData = successCallback(fakePerson);

       expect(personData.f_name).toBe(fakePerson.f_name);
       expect(personData.l_name).toBe(fakePerson.l_name);
       expect(personData.address).toBe(fakePerson.address);
       expect(personData.phone_num).toBe(fakePerson.phone_num);
    }); 


  });

  describe('the updatePerson function', function () {

    it('should be successfully called', function() {
      spyOn($,'ajax');
      modelMethods.updatePerson(1);

      createFakeSuccess();
      successCallback();

      expect(successCallback).toHaveBeenCalled();

    });

    it('updatePerson should be a PUT request', function() {
      spyOn($,'ajax');
      modelMethods.updatePerson(1);
      //refactor this code 
      expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("PUT");
    });

    it('should return PUT data', function(){ 
      spyOn($,'ajax');
      modelMethods.updatePerson(1, fakePerson)

      createFakeSuccess();
      var data = successCallback(fakePerson);
      
      expect(fakePerson.f_name).toBe(data.f_name);
      expect(fakePerson.l_name).toBe(data.l_name);
      expect(fakePerson.address).toBe(data.address);
      expect(fakePerson.phone_num).toBe(data.phone_num);
    });
  }); 

  describe('the postNewPerson function', function() {

    it('should be successfully called', function() {
      spyOn($,'ajax');
      modelMethods.postNewPerson(fakePerson);

      createFakeSuccess();
      successCallback();

      expect(successCallback).toHaveBeenCalled();

    });

    it('postNewPerson should be a POST request', function() {
      spyOn($,'ajax');
      modelMethods.postNewPerson(1);
      //refactor this code 
      expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("POST");
    });

    it('should post a new person', function() {
      spyOn($,'ajax'); 

      modelMethods.postNewPerson(fakePerson);

      createFakeSuccess();
      var data = successCallback(fakePerson);

      expect(fakePerson.f_name).toBe(data.f_name);
      expect(fakePerson.l_name).toBe(data.l_name);
      expect(fakePerson.address).toBe(data.address);
      expect(fakePerson.phone_num).toBe(data.phone_num);

    });
  });
});
