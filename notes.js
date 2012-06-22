//On form submit click, call:
//

$('.search_form').submit(function(event){
  //prevents refresh
  event.preventDefault();

  // submits post 
  $.ajax({
    type:'POST',
    url: url, //POST or PUT controller in rails
    data: {},
    dataType: 'json',
    success: function (){
    
    }
  });


});

  
