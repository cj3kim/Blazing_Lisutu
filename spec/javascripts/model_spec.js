
//=require people.js
//=require listener.js
//=require model.js
//=require view.js
//=require jquery
//=require jquery_ujs

describe('the model functions', function () {

  var createFakeSuccess, getPersonArgs, successCallback;
  var $person1,$showButton, editForm, fakePerson; 

  beforeEach( function () {
     loadFixtures('index');
     jasmine.Clock.useMock();

     //Deals with Mock and animation incompatibilities
     jQuery.fx.off = true;

     //sets fake success function variable for ajax testing
     createFakeSuccess = function () {
        getPersonArgs = $.ajax.argsForCall;
        getPersonArgs[0][0].success = 
          jasmine.createSpy('success mock')
                 .andCallFake( function (fakePerson) {
                                   return fakePerson;  
                            });
        successCallback = getPersonArgs[0][0].success;
     }
     //fake JSON object
     fakePerson = {
       f_name:'Chris' ,
       l_name:'Kim',
       address:'Somewhere Wonderful' ,
       phone_num:'(234) 242-1234' 
     }

  });

  describe('the getPerson function', function () {
    beforeEach( function() {
      spyOn($, 'ajax'); 
      modelMethods.getPerson(1);
      createFakeSuccess();
    });

    it('should be a GET request', function() {
       
       expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("GET");
    });

    it('should successfully be called', function() {

      successCallback();
      expect(successCallback).toHaveBeenCalled(); 
    });

    it('should return GET data', function() {

       var personData = successCallback(fakePerson);

       expect(personData.f_name).toBe(fakePerson.f_name);
       expect(personData.l_name).toBe(fakePerson.l_name);
       expect(personData.address).toBe(fakePerson.address);
       expect(personData.phone_num).toBe(fakePerson.phone_num);
    }); 


  });

  describe('the updatePerson function', function () {
    beforeEach( function() {
      spyOn($, 'ajax'); 
      modelMethods.updatePerson(1);
      createFakeSuccess();
    });    
    
    it('should be a PUT request', function() {

      expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("PUT");
    });

    it('should be successfully called', function() {

      successCallback();
      expect(successCallback).toHaveBeenCalled();
    });

    it('should return PUT data', function(){ 

      var data = successCallback(fakePerson);
      
      expect(fakePerson.f_name).toBe(data.f_name);
      expect(fakePerson.l_name).toBe(data.l_name);
      expect(fakePerson.address).toBe(data.address);
      expect(fakePerson.phone_num).toBe(data.phone_num);
    });
  }); 

  describe('the postNewPerson function', function() {

    beforeEach( function() {
      spyOn($, 'ajax'); 
      modelMethods.postNewPerson(fakePerson);
      createFakeSuccess();
    });    

    it('should be a POST request', function() {

      expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("POST");
    });

    it('should be successfully called', function() {
      successCallback();
      expect(successCallback).toHaveBeenCalled();
    });

    it('should return post data', function() {
      createFakeSuccess();
      var data = successCallback(fakePerson);

      expect(fakePerson.f_name).toBe(data.f_name);
      expect(fakePerson.l_name).toBe(data.l_name);
      expect(fakePerson.address).toBe(data.address);
      expect(fakePerson.phone_num).toBe(data.phone_num);

    });
  });

  describe('the deletePerson function', function() {
    beforeEach( function() {
      spyOn($, 'ajax'); 
      modelMethods.deletePerson(1);
      createFakeSuccess();
    });    

    it('should be a DELETE request', function() {

      expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("DELETE");
    });

    it('should be successfully called', function() {
      successCallback();
      expect(successCallback).toHaveBeenCalled();
    });
  });
});
