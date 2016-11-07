function ViewModel() {
   var self = this;
   self.showPrev = showPrev;
   self.showNext0 = showNext0;
   self.submitSurvey = submitSurvey;
   self.nextPane = nextPane;
   self.prevPane = prevPane;
   self.onEnter = onEnter;
   self.selectQuestion = selectQuestion;
   self.moveQuestion = moveQuestion;
   self.reset = reset;

   self.pane = ko.observable(0);
   self.showNext1 = ko.observable(false);
   self.showNext2 = ko.observable(false);
   self.showFinish = ko.observable(false);
   self.selectedQuestion = ko.observable(0);
   self.loading = ko.observable(false);
   self.name = ko.observable('');
   self.answers1 = ko.observableArray([]);
   self.answers2 = ko.observableArray([]);
   self.answers3 = ko.observableArray([]);
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
      new Question("We need to institute reforms within the current system to change our communities."),
      new Question("We need to change people's attitudes in order to solve social problems."),
      new Question("It is important that equal opportunity be available to all people."),
      new Question("It is hard for a group to function effectively when the people involved come from very diverse backgrounds."),
      new Question("I prefer the company of people who are very similar to me in background and expressions."),
      new Question("I find it difficult to relate to people from a different race or culture."),
      new Question("I enjoy meeting people who come from background very different from my own."),
      new Question("Cultural diversity within a group makes the group more interesting and effective.")
   ]);

   self.q2s = ko.observableArray([
      new Question("If I choose to participate in community service in the future, I will be able to make a meaningful contribution."),
      new Question("In the future, I will be able to find community service opportunities which are relevant to my interests and abilities."),
      new Question("I am confident that, through community service, I can help in promoting social justice."),
      new Question("I am confident that, through community service, I can make a difference in my community."),
      new Question("I am confident that I can help individuals in need by participating in community service activities."),
      new Question("I am confident that, in future community service activities, I will be able to interact with relevant professionals in ways that are meaningful and effective."),
      new Question("I am confident that, through community service, I can help in promoting equal opportunity for citizens."),
      new Question("Through community service, I can apply knowledge in ways that solve \"real-life\" problems."),
      new Question(" By participating in community service, I can help people to help themselves."),
      new Question("I am confident that I will participate in community service activities in the future.")
   ]);

   function Question(question) {
      var self = this;
      self.question = question;
      self.value = ko.observable(0);

      self.setValue = function (val) {
         self.value(val);
         checkAnswers();
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
      self.loading(true);
      
      //Survey #1
      $.each(self.q1s(), function (key) {
         var question = self.q1s()[key];
         self.answers1()[key + 1] = question.value();
      });

      //Survey #2
      $.each(self.q2s(), function (key) {
         var question = self.q2s()[key];
         self.answers2()[key + 1] = question.value();
      });

      // Survey #3
      var answerBuckets = $('.answer-content');
      $.each(answerBuckets, function (key) {
         var bucket = $(answerBuckets[key]);
         var bucketId = bucket.attr('id').match(/[0-9]/)[0];
         var children = "";
         $.each(bucket.children(), function (key) {
            var child = $(bucket.children()[key]);
            children += child.attr('id') + ",";
         });
         self.answers3()[bucketId] = children.slice(0, -1);
      });

      var data = {
         'Name': self.name(),
         '1-1': self.answers1()[1],
         '1-2': self.answers1()[2],
         '1-3': self.answers1()[3],
         '1-4': self.answers1()[4],
         '1-5': self.answers1()[5],
         '1-6': self.answers1()[6],
         '1-7': self.answers1()[7],
         '1-8': self.answers1()[8],
         '1-9': self.answers1()[9],
         '1-10': self.answers1()[10],
         '1-11': self.answers1()[11],
         '1-12': self.answers1()[12],
         '1-13': self.answers1()[13],
         '1-14': self.answers1()[14],
         '1-15': self.answers1()[15],
         '1-16': self.answers1()[16],
         '1-17': self.answers1()[17],
         '1-18': self.answers1()[18],
         '1-19': self.answers1()[19],
         '1-20': self.answers1()[20],
         '1-21': self.answers1()[21],
         '1-22': self.answers1()[22],
         '1-23': self.answers1()[23],
         '1-24': self.answers1()[24],
         '1-25': self.answers1()[25],
         '1-26': self.answers1()[26],
         '1-27': self.answers1()[27],
         '1-28': self.answers1()[28],
         '1-29': self.answers1()[29],
         '1-30': self.answers1()[30],
         '1-31': self.answers1()[31],
         '1-32': self.answers1()[32],
         '1-33': self.answers1()[33],
         '1-34': self.answers1()[34],
         '1-35': self.answers1()[35],
         '1-36': self.answers1()[36],
         '1-37': self.answers1()[37],
         '1-38': self.answers1()[38],
         '1-39': self.answers1()[39],
         '2-1': self.answers2()[1],
         '2-2': self.answers2()[2],
         '2-3': self.answers2()[3],
         '2-4': self.answers2()[4],
         '2-5': self.answers2()[5],
         '2-6': self.answers2()[6],
         '2-7': self.answers2()[7],
         '2-8': self.answers2()[8],
         '2-9': self.answers2()[9],
         '2-10': self.answers2()[10],
         'Strongly Disagree': self.answers3()[1],
         'Disagree': self.answers3()[2],
         'Neutral': self.answers3()[3],
         'Agree': self.answers3()[4],
         'Strongly Agree': self.answers3()[5]
      }

      $.ajax({
         url: "https://script.google.com/macros/s/AKfycbyJn8NBamgt1zQEJiECZkkl27Ocq2s2_afPRbnFyoZ4Py7ODv1W/exec",
         data: data,
         type: "POST",
         dataType: "xml",
         statusCode: {
            0: function () {
               reset();
            },
            200: function () {
               reset();
            }
         }
      });
   }

   function checkAnswers() {
      var showNext1 = true;
      $.each(self.q1s(), function (key) {
         var question = self.q1s()[key];
         if (question.value() == 0) {
            showNext1 = false;
         }
      });

      self.showNext1(showNext1);
      
      var showNext2 = true;
      $.each(self.q2s(), function (key) {
         var question = self.q2s()[key];
         if (question.value() == 0) {
            showNext2 = false;
         }
      });

      self.showNext2(showNext2);
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

   function showPrev() {
      return self.pane() > 0;
   }

   function onEnter(d,e){
      if(e.keyCode === 13 && self.name().length > 0) {
         nextPane();  
      }
      return true;
   }
   
   function selectQuestion(id) {
      if(self.selectedQuestion() == 0) {
         self.selectedQuestion(id);
      } else {
         var question = $('#' + id);
         question.parent().append($('#' + self.selectedQuestion()));
         self.selectedQuestion(0);
         checkBuckets();
      }
   }
   
   function moveQuestion(bucketId) {
      var bucket = $('#bucket-' + bucketId);
      bucket.append($('#' + self.selectedQuestion()));
      self.selectedQuestion(0);
      checkBuckets();
   }
   
   function reset() {
      self.pane(0);
      self.showNext1(false);
      self.showNext2(false);
      self.showFinish(false);
      self.selectedQuestion(0);
      self.name('');
      self.answers1([]);
      self.answers2([]);
      self.answers3([]);
      self.q1s([
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
         new Question("We need to institute reforms within the current system to change our communities."),
         new Question("We need to change people's attitudes in order to solve social problems."),
         new Question("It is important that equal opportunity be available to all people."),
         new Question("It is hard for a group to function effectively when the people involved come from very diverse backgrounds."),
         new Question("I prefer the company of people who are very similar to me in background and expressions."),
         new Question("I find it difficult to relate to people from a different race or culture."),
         new Question("I enjoy meeting people who come from background very different from my own."),
         new Question("Cultural diversity within a group makes the group more interesting and effective.")
      ]);

      self.q2s([
         new Question("If I choose to participate in community service in the future, I will be able to make a meaningful contribution."),
         new Question("In the future, I will be able to find community service opportunities which are relevant to my interests and abilities."),
         new Question("I am confident that, through community service, I can help in promoting social justice."),
         new Question("I am confident that, through community service, I can make a difference in my community."),
         new Question("I am confident that I can help individuals in need by participating in community service activities."),
         new Question("I am confident that, in future community service activities, I will be able to interact with relevant professionals in ways that are meaningful and effective."),
         new Question("I am confident that, through community service, I can help in promoting equal opportunity for citizens."),
         new Question("Through community service, I can apply knowledge in ways that solve \"real-life\" problems."),
         new Question(" By participating in community service, I can help people to help themselves."),
         new Question("I am confident that I will participate in community service activities in the future.")
      ]);

      self.loading(false);
      window.alert("Success! Thank you for your input.");
   }
}

function setup() {
   var vModel = new ViewModel();
   ko.applyBindings(vModel);
}
