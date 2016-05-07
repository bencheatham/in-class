var students = [];
var teachers = [];
var thumbLog = [];

function emitThumbCheck () {
  console.log('broadcast thumb check!')
  this.broadcast.emit('thumbCheck', {});
}

function emitThumbResponse (data) {
  console.log('student submitted thumb event!',data.thumb);
  thumbLog.push(data);
  console.log(thumbLog);

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