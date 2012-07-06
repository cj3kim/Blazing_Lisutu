// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

//= require jquery
//= require jquery_ujs

$(document).ready(function() {

  var modelMethods = new Model(); 
  var listen = new Listener(); 

  listen.forClickTdShow();
  listen.forClickOnNewButton();
}); 








