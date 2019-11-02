import $ from 'jquery';
import '../plugins/air-datapicker/js/datepicker.js';

/*$('<h1 />')
.text('Hello world')
.css({
  color: 'blue'
})
.appendTo($('header'))*/

$('#datepicker').data({
  // autoClose: true,
  range: true,
/*  inline: true,*/
  clearButton: true
});
