// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

var selectPerson = function(number) {
  var person = $('table tr:eq(' + number + ')'); 
  return person; 
} 


  var loadData = function(object,form){
      var id = object.attr('id') 
      
      var url = '/addressbook/'+ id + '/edit/' 

      $.ajax( url, {
        type: 'GET',
        cache: false, 
        dataType: 'json',
        success: function(result) {

          var div = $(object).find('div.form_box');
          div.append(form);
          /* 
          div.append('<br>'); 
          div.append('<p>' + result.f_name + '</p>'); 
          div.append('<p>' + result.l_name + '</p>'); 
          div.append('<p>' + result.address + '</p>'); 
          div.append('<p>' + result.phone_num + '</p>'); 
          */
        },
      }); 
  }
  

var insertForm = function (object, form) {

  //object is parentNode from $(document).ready
  var id = $(object).attr('id');

  var formBox = $('<tr id='+id+'><td colspan=6><div class=\'form_box\'></div></td></tr>');
  var childTrNode = $(object).next();

  if (childTrNode.find('div.form_box').length !== 0 ) {

    childTrNode.find('div.form_box').slideToggle(2000, function(){
      childTrNode.remove();
    });
  } else {

    var childTrNode = $(object).after(formBox).next(); 
    var div = childTrNode.find('div.form_box');

    loadData(childTrNode, form);

    div.hide();
    div.slideDown(2000);
    
  }
}
