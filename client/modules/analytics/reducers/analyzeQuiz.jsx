export default function analyzeQuiz(quiz, responses){

  let quizAddOns = {};

  quizAddOns.questions =  quiz.questions.reduce((accum1, item, idx) => {
    
    let tmp1 = {};
    tmp1[item.question] = item.choices.reduce((accum2, item, idx) => {
     if(accum2.responses === undefined){
      accum2.responses = {};
     }

     accum2.responses[item] = 0;
     return accum2;
    }, {} );
    accum1[Object.keys(tmp1)[0]] = tmp1[Object.keys(tmp1)[0]];
    return accum1;
    
  }, {} );

  let checkQuizIndexes = () => {  
    return quiz.questions.reduce((accum, item, idx) => {
        if(item.index !== idx) { 
          accum = false;
        }
        return accum;
      }, true); 
  };

  let initStudentData = {
    studentTotals: [],
    uniqueScoresObj: {},
    classPercentageAccum: 0,
    classAverage: 0,
    questionTally: {},
    answerTally: quizAddOns
  };


  let classScores = responses.answers.reduce((accum1, item, idx) => {

    let currentStud = item.studentname;

   
    let one = item.answers.reduce((accum2, answer) => {
        accum2.studentname = currentStud;

        if(answer.val === quiz.questions[answer.index].answer) {
          accum2.right += 1;
        } else {
             accum2.wrong += 1;
        }
      
        return accum2;
      }, {right: 0, wrong: 0});
   
    item.answers.forEach((answer) => {
     accum1.answerTally.questions[quiz.questions[answer.index].question].responses[answer.val] += 1;
    });
 

    accum1.studentTotals[idx] = one;
    let percentage = Math.round(one.right / (one.right + one.wrong) * 100, 2);
    accum1.studentTotals[idx].percentage = percentage;

    if(accum1.uniqueScoresObj[percentage] === undefined){
     accum1.uniqueScoresObj[percentage] = 1;
    } else {
     accum1.uniqueScoresObj[percentage] += 1; 
    }
    if(accum1.uniqueScoresObj[100] === undefined){
     accum1.uniqueScoresObj[100] = 0;
    }
      if(accum1.uniqueScoresObj[0] === undefined){
     accum1.uniqueScoresObj[0] = 0;
    }

    accum1.classPercentageAccum += percentage;
    accum1.classAverage = Math.round(accum1.classPercentageAccum / accum1.studentTotals.length, 2);

    return accum1;

  }, initStudentData);


  for(var key1 in classScores.answerTally.questions) {
    classScores.answerTally.questions[key1].labels = [];
    classScores.answerTally.questions[key1].responseData = [];
    
    for(var key2 in classScores.answerTally.questions[key1].responses) {
      classScores.answerTally.questions[key1].labels.push(key2);
      classScores.answerTally.questions[key1].responseData.push(quizAddOns.questions[key1].responses[key2]);
    }  
  }

  let uniqueScores = [];
  let scoreData = [];
  for (var key in classScores.uniqueScoresObj) {
   uniqueScores.push(key);
   scoreData.push(classScores.uniqueScoresObj[key]);
  }

  classScores.uniqueScores = uniqueScores;
  classScores.scoreData = scoreData;


  let stdDeviationStart = {
   diffSquaredSum: 0,
   variance: 0,
   stdDev: 0,
   numStudents: classScores.studentTotals.length,
   classAvg: classScores.classAverage
  };

  let addOns = classScores.studentTotals.reduce((accum, answer) => {
    
    accum.diffSquaredSum += Math.pow((answer.percentage - accum.classAvg), 2);
    accum.variance = Math.round(accum.diffSquaredSum / accum.numStudents);
    accum.stdDev = Math.round(Math.sqrt(accum.variance));
    return accum;
    
  }, stdDeviationStart);

  for(var key in addOns) {
   classScores[key] = addOns[key];
  }

  classScores.title = responses.title;

  console.log(classScores)

  return classScores;

}