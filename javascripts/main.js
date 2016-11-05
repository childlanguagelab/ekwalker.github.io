$(document).ready(function() {
   $('.bucket').sortable({
      connectWith: ".bucket",
      stop: checkBuckets,
      over: hoverList,
      out: leaveList
   }).disableSelection();

   function checkBuckets() {
      var questionBucket = $('#bucket-0');
      var answerBuckets = $('.answer-content');
      var hasError = false;
      
      $.each(answerBuckets, function (key) {
         var bucket = $(answerBuckets[key]);
         if(bucket.children('.question').length > 4) {
            hasError = true;
            if(!bucket.parent().hasClass('error')) {
               bucket.parent().addClass('error');
            }
         } else {
            if(bucket.parent().hasClass('error')) {
               bucket.parent().removeClass('error');
            }
         }
      });
      
      var send = $('#send-wrapper');
      if(questionBucket.children('.question').length == 0  && !hasError)   {
         if(send.hasClass('disabled')) {
            send.removeClass('disabled');
         }
      } else {
         if(!send.hasClass('disabled')) {
            send.addClass('disabled');
         }
      }
   }
   
   function hoverList() {
      $(this).addClass('over');
   }
   
   function leaveList() {
      $(this).removeClass('over');
   }
});