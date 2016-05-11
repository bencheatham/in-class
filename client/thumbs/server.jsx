var students = [];
var teachers = [];
var thumbLog = [];

var teacherSocket;

function emitThumbCheck () {
  console.log('broadcast thumb check!')
  teacherSocket = this;
  this.broadcast.emit('thumbCheck', {});
}

function emitThumbResponse (data) {
  console.log('student submitted thumb event!',data.thumb);
  // thumbLog.push(data);
  // console.log(thumbLog);

// console.log(teacherSocket);

teacherSocket.emit('thumbResponse', data.thumb);
// teacherSocket.emit('thumbResponse', 'up');

  // teachers.forEach(function(teacher){
  //     teacher.emit('thumb-student', {
  //       thumb: data.thumb
  //     });  
  // });
}

var thumbEvents = {
  'thumb-student': emitThumbResponse,
  'thumbCheck': emitThumbCheck,
};

exports.module = {
 thumbEvents: thumbEvents,
 thumbLog: thumbLog
}