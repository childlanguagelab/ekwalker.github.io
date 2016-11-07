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
       {
           question: "I plan to do some volunteer work.",
           number: '1-1',
			value: 0
       },
       {
           question: "I plan to become involved in my community.",
           number: '1-2',
			value: 0
       },
       {
           question: "I plan to participate in a community action program.",
           number: '1-3',
			value: 0
       },
       {
           question: "I plan to become an active member of my community.",
           number: '1-4',
			value: 0
       },
       {
           question: "In the future, I plan to participate in a community service organization.",
           number: '1-5',
			value: 0
       },
       {
           question: "I plan to help others who are in difficulty.",
           number: '1-6',
			value: 0
       },
       {
           question: "I am committed to making a positive difference.",
           number: '1-7',
			value: 0
       },
       {
           question: "I can listen to other people's opinions.",
           number: '1-8',
			value: 0
       },
       {
           question: "I can work cooperatively with a group of people.",
           number: '1-9',
			value: 0
       },
       {
           question: "I can think logically in solving problems.",
           number: '1-10',
			value: 0
       },
       {
           question: "I can easily get along with people.",
           number: '1-11',
			value: 0
       },
       {
           question: "I try to find effective ways of resolving problems.",
           number: '1-12',
			value: 0
       },
       {
           question: "When trying to understand the position of other, I try to place myself in their positions.",
           number: '1-13',
			value: 0
       },
       {
           question: "I find it easy to make friends.",
           number: '1-14',
			value: 0
       },
       {
           question: "I can think analytically in solving problems.",
           number: '1-15',
			value: 0
       },
       {
           question: "I try to place myself in the place of others in trying to assess their current situation.",
           number: '1-16',
			value: 0
       },
       {
           question: "I tend to solve problems by talking them out.",
           number: '1-17',
			value: 0
       },
       {
           question: "I am aware of current events.",
           number: '1-18',
			value: 0
       },
       {
           question: "I am knowledgeable of the issues facing the world.",
           number: '1-19',
			value: 0
       },
       {
           question: "I am aware of the events happening in my local community.",
           number: '1-20',
			value: 0
       },
       {
           question: "I plan to be involved in the political process.",
           number: '1-21',
			value: 0
       },
       {
           question: "I understand the issues facing my city's community.",
           number: '1-22',
			value: 0
       },
       {
           question: "I am a better follower than a leader.",
           number: '1-23',
			value: 0
       },
       {
           question: "I am a good leader.",
           number: '1-24',
			value: 0
       },
       {
           question: "I have the ability to lead a group of people.",
           number: '1-25',
			value: 0
       },
       {
           question: "I would rather have somebody else take the lead in formulating a solution.",
           number: '1-26',
			value: 0
       },
       {
           question: "I feel that I can make a difference in the world.",
           number: '1-27',
			value: 0
       },
       {
           question: "I don't understand why some people are poor when there are boundless opportunities available to them.",
           number: '1-28',
			value: 0
       },
       {
           question: "People are poor because they choose to be poor.",
           number: '1-29',
			value: 0
       },
       {
           question: "Individuals are responsible for their own misfortunes.",
           number: '1-30',
			value: 0
       },
       {
           question: "We need to look no further than the individual in assessing his/her problems.",
           number: '1-31',
			value: 0
       },
   ]);

function Question(question, number) {
    var self = this;
    self.question = question;
    self.number = number;
    self.value = ko.observable(0);

    self.setValue = function(val) {
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
