import $ from 'jquery';

$('<h1 />')
.text('Hello world')
.css({
  color: 'blue'
})
.appendTo($('header'))
