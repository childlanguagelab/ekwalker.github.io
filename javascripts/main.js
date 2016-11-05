

// Overall viewmodel for this screen, along with initial state
function ViewModel() {
   var self = this;
   self.pane = ko.observable('survey1');
   self.showSave = ko.observable(false);
   self.name = ko.observable('Test');
   self.answers = ko.observableArray([]);
   
   self.submitSurvey = submitSurvey;
   
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

      if(questionBucket.children('.question').length == 0  && !hasError)   {
         self.showSave(true);
      } else {
         self.showSave(false);
      }
   }

   function hoverList() {
      $(this).addClass('over');
   }

   function leaveList() {
      $(this).removeClass('over');
   }
   
   function submitSurvey() {
      console.log('submitting survey');
      var answerBuckets = $('.answer-content');
      $.each(answerBuckets, function (key) {
         var bucket = $(answerBuckets[key]);
         var bucketId = bucket.attr('id').match(/[0-9]/)[0];
         var children = [];
         $.each(bucket.children(), function(key) {
            var child = $(bucket.children()[key]);
            children.push(child.attr('id'));
         });
         self.answers()[bucketId] = children;
      });
      console.log('full answers');
      console.log(self.answers());

      $.ajax({
         url: "https://docs.google.com/spreadsheets/d/1sYteDZZyWkmdWNKVaifSp2VYISFBNpBRdaX5q3F-4os/formResponse",
         data: {"entry.1" : self.answers()[1], "entry.2" : self.answers()[2], "entry.3": self.answers()[3], "entry.4": self.answers()[4]},
         type: "POST",
         dataType: "xml",
         statusCode: {
            0: function (){
               window.alert('success?');
            },
            200: function (){
               window.alert('success?');
            }
         }
      });
   }
}

/*
 * setup function:
 * Initializes player names as contenteditables and sets up click handlers on control buttons
 */

function setup() {
   var vModel = new ViewModel();
   ko.applyBindings(vModel);
}
