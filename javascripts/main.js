function ViewModel() {
   var self = this;
   self.showPrev = showPrev;
   self.showNext0 = showNext0;
   self.showNext1 = showNext1;
   self.showNext2 = showNext2;
   self.submitSurvey = submitSurvey;
   self.nextPane = nextPane;
   self.prevPane = prevPane;

   self.pane = ko.observable(0);
   self.showFinish = ko.observable(false);
   self.name = ko.observable('Test');
   self.answers = ko.observableArray([]);
   self.q1s = ko.observableArray([
      new Question("I plan to do some volunteer work."),
      new Question("I plan to become involved in my community."),
      new Question("I plan to participate in a community action program."),
      new Question("I plan to become an active member of my community."),
      new Question("In the future, I plan to participate in a community service organization."),
      new Question("I plan to help others who are in difficulty."),
      new Question("I am committed to making a positive difference."),
      new Question("I can listen to other people's opinions."),
      new Question("I can work cooperatively with a group of people."),
      new Question("I can think logically in solving problems."),
      new Question("I can easily get along with people."),
      new Question("I try to find effective ways of resolving problems."),
      new Question("When trying to understand the position of other, I try to place myself in their positions."),
      new Question("I find it easy to make friends."),
      new Question("I can think analytically in solving problems."),
      new Question("I try to place myself in the place of others in trying to assess their current situation."),
      new Question("I tend to solve problems by talking them out."),
      new Question("I am aware of current events."),
      new Question("I am knowledgeable of the issues facing the world."),
      new Question("I am aware of the events happening in my local community."),
      new Question("I plan to be involved in the political process."),
      new Question("I understand the issues facing my city's community."),
      new Question("I am a better follower than a leader."),
      new Question("I am a good leader."),
      new Question("I have the ability to lead a group of people."),
      new Question("I would rather have somebody else take the lead in formulating a solution."),
      new Question("I feel that I can make a difference in the world."),
      new Question("I don't understand why some people are poor when there are boundless opportunities available to them."),
      new Question("People are poor because they choose to be poor."),
      new Question("Individuals are responsible for their own misfortunes."),
      new Question("We need to look no further than the individual in assessing his/her problems."),
   ]);

   function Question(question) {
      var self = this;
      self.question = question;
      self.value = ko.observable(0);

      self.setValue = function (val) {
         self.value(val);
      }
   }

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
         if (bucket.children('.question').length > 4) {
            hasError = true;
            if (!bucket.parent().hasClass('error')) {
               bucket.parent().addClass('error');
            }
         } else {
            if (bucket.parent().hasClass('error')) {
               bucket.parent().removeClass('error');
            }
         }
      });

      if (questionBucket.children('.question').length == 0 && !hasError) {
         self.showFinish(true);
      } else {
         self.showFinish(false);
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
         $.each(bucket.children(), function (key) {
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
            0: function () {
               window.alert('success?');
            },
            200: function () {
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

   function showNext0() {
      return self.name().length > 0;
   }

   function showNext1() {
      return true;
   }

   function showNext2() {
      return true;
   }

   function showPrev() {
      return self.pane() > 0;
   }
}

function setup() {
   var vModel = new ViewModel();
   ko.applyBindings(vModel);
}
