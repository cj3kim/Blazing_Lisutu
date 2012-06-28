// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

var loadData = function(childTrNode,form){
    var id = parseInt(childTrNode.attr('id'));
    
    var url = '/addressbook/'+ id + '/edit/';

    $.ajax( url, {
      type: 'GET',
      cache: 'false', 
      dataType: 'json',
      success: function(result) {
        var divInChildTrNode = $(childTrNode).find('div.form_box');
        var newForm = $(form);
        
        divInChildTrNode.append(newForm); 
        
        newForm.submit( function (event){

              event.preventDefault();

              var parentForm = $(this);
              var inputs = parentForm.children('input');
              var hiddenInputs = parentForm.children('div').children();
              var utf8 = $(hiddenInputs[0]).attr('value');
              var token = $(hiddenInputs[1]).attr('value');

              var f_name =    $(inputs[0]).attr('value');
              var l_name =    $(inputs[1]).attr('value');
              var address =   $(inputs[2]).attr('value');
              var phone_num = $(inputs[3]).attr('value');

              var data = { utf8: utf8 , token: token ,post:{f_name: f_name , l_name: l_name , address: address , phone_num: phone_num }};

              var url = '/addressbook/' + id;


              $.ajax(url, {
                type:'PUT',
                data: data,
                dataType: 'json',
                success: function (){
                  alert('Worked!');
                }
              });

              personAttr = $('#'+id+'p').children('td');
              $(personAttr[0]).text(f_name); 
              $(personAttr[1]).text(l_name);
              $(personAttr[2]).text(address);
              $(personAttr[3]).text(phone_num);

              return false;
          });
      

        var inputs = newForm.find('input');
       
        $(inputs[6]).attr('action', '/addressbook/' + result.id);
        $(inputs[6]).attr('id', result.id);

        $(inputs[2]).attr('value', result.f_name);
        $(inputs[3]).attr('value', result.l_name);
        $(inputs[4]).attr('value', result.address);
        $(inputs[5]).attr('value', result.phone_num);

      }
    }); 
};


/*Post Data
      var url = '/address/new/'
      $.ajax(url,{
        type: 'POST',
        data: data,
        success: function(){
          alert('It worked!') 
        }
      });
*/

var insertForm = function (parentTrNode, form) {

  //object is parentNode from $(document).ready
  var id = $(parentTrNode).attr('id');

  var formBox = $('<tr id='+id+'><td colspan=6><div class=\'form_box\'></div></td></tr>');
  var childTrNode = $(parentTrNode).next();

  if (childTrNode.find('div.form_box').length !== 0 ) {
    childTrNode.find('div.form_box').slideToggle(2000, function(){
      childTrNode.remove();
    });
  } else {
    var childTrNode = $(parentTrNode).after(formBox).next(); 
    var divInChildTrNode = childTrNode.find('div.form_box');

    loadData(childTrNode, form);

    divInChildTrNode.hide();
    divInChildTrNode.slideDown(2000);
    
  }
}
