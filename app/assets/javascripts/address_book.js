// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

var selectPerson = function(number) {
  var person = $('table tr:eq(' + number + ')'); 
  return person; 
} 

var insertForm = function (object) {
  
  //object is parentNode from $(document).ready

  var formBox = $('<tr><td colspan=6><div class="form_box"></div></td></tr>');
  var childTrNode = $(object).next();

  if (childTrNode.find('div.form_box').length !== 0 ) {

    childTrNode.find('div.form_box').slideToggle(2000, function(){
      childTrNode.remove();
    });
  } else {

    $(object).after(formBox); //returns parent node
    var div = $(object).next().find('div.form_box');
    div.hide();
    div.slideDown(2000);
    
  }
}

