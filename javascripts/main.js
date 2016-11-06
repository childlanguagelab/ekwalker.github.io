function ViewModel() {
   var self = this;
   self.pane = ko.observable(0);
   self.showSave = ko.observable(false);
   self.name = ko.observable('Test');
   self.answers = ko.observableArray([]);
   
   self.submitSurvey = submitSurvey;
   self.nextPane = nextPane;
   self.prevPane = prevPane;
   
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
         var children = "";
         $.each(bucket.children(), function(key) {
            var child = $(bucket.children()[key]);
            children += child.attr('id') + ",";
         });
         self.answers()[bucketId] = children.slice(0, -1);
      });
      console.log('full answers');
      console.log(self.answers());
      
      var data = {
         'Name': self.name(),
         'Strongly Disagree': self.answers()[1],
         'Disagree': self.answers()[2],
         'Neutral': self.answers()[3],
         'Agree': self.answers()[4],
         'Strongly Agree': self.answers()[5],
      }

      $.ajax({
         url: "https://script.google.com/macros/s/AKfycbyJn8NBamgt1zQEJiECZkkl27Ocq2s2_afPRbnFyoZ4Py7ODv1W/exec",
         data: data,
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
   
   function nextPane() {
      self.pane(self.pane() + 1);
   }
   
   function prevPane() {
      self.pane(self.pane() - 1);
   }
}

function setup() {
   var vModel = new ViewModel();
   ko.applyBindings(vModel);
}
