# InClass
A tool for improving in-class student-teacher interactions

## Introduction
Although laptops in classroom are ubiquitous, students are the only ones taking advantage of them. Classrooms have been slow to use these technologies to enhance a lecturer’s effectiveness in a physical classroom setting.  The platform **In Class** aims to enhance the classroom experience by increasing communication channels between students and the teacher and introducing feedback loops to assess whether students understand the presented material in real-time.




## Team

Scrum Master - Louis Buchbinder

Product Owner - Ben Cheatham

Software Engineer - Stephen Sullivan

Software Engineer - Jason Wu


<div>
  <hr>
  <div>
    <div>
      <h2>Thumb Checks</h2>
      <span>Real-time Comprehension Checks</span>
      <p>Addresses difficulty of determining (in real-time) whether students understand material covered in presentation.</p>
    </div><div>
      <img src="/images/thumbs-up-thumbs-down.gif" width="500px" height="500px;">
    </div>
  </div>
  <hr class="featurette-divider" data-reactid=".0.0.0.1.1.2"><div class="row featurette" data-reactid=".0.0.0.1.1.3"><div class="col-md-7 col-md-push-5" data-reactid=".0.0.0.1.1.3.0"><h2 class="featurette-heading" data-reactid=".0.0.0.1.1.3.0.0">Give Quizes</h2><span class="muted" data-reactid=".0.0.0.1.1.3.0.1">Assess Student Comprehension With Real-time Quiz</span><p class="lead" data-reactid=".0.0.0.1.1.3.0.2">Address difficulty of determining (in real-time) whether students understand material covered in presentation </p></div><div class="col-md-5 col-md-pull-7" data-reactid=".0.0.0.1.1.3.1"><img class="feature-image featurette-image img-responsive center-block" src="/images/quiz.png" alt="Quiz" data-reactid=".0.0.0.1.1.3.1.0"></div></div><hr class="featurette-divider" data-reactid=".0.0.0.1.1.4"><div class="row featurette" data-reactid=".0.0.0.1.1.5"><div class="col-md-7" data-reactid=".0.0.0.1.1.5.0"><h2 class="featurette-heading" data-reactid=".0.0.0.1.1.5.0.0">Quiz Results Analytics</h2><span class="muted" data-reactid=".0.0.0.1.1.5.0.1">Get Instant Visualization of Quiz Results</span><p class="lead" data-reactid=".0.0.0.1.1.5.0.2">Understang in real-time the class' material comprehension with data Visualization.</p></div><div class="col-md-5" data-reactid=".0.0.0.1.1.5.1"><img class="feature-image featurette-image img-responsive center-block" src="/images/analytics.jpg" alt="Analytics" data-reactid=".0.0.0.1.1.5.1.0"></div></div><hr class="featurette-divider" data-reactid=".0.0.0.1.1.6"><div class="row featurette" data-reactid=".0.0.0.1.1.7"><div class="col-md-7 col-md-push-5" data-reactid=".0.0.0.1.1.7.0"><h2 class="featurette-heading" data-reactid=".0.0.0.1.1.7.0.0">Class Question Board</h2><span class="muted" data-reactid=".0.0.0.1.1.7.0.1">Let students post and upvote real-time questions</span><p class="lead" data-reactid=".0.0.0.1.1.7.0.2">Provides ability to ask questions as they arise and let the class upvote the question if it is relevant.</p></div><div class="col-md-5 col-md-pull-7" data-reactid=".0.0.0.1.1.7.1"><img class="feature-image featurette-image img-responsive center-block" src="/images/questions.jpg" alt="Questions" data-reactid=".0.0.0.1.1.7.1.0"></div></div><hr class="featurette-divider" data-reactid=".0.0.0.1.1.8"><div class="row featurette" data-reactid=".0.0.0.1.1.9"><div class="col-md-7" data-reactid=".0.0.0.1.1.9.0"><h2 class="featurette-heading" data-reactid=".0.0.0.1.1.9.0.0">Class Chat</h2><span class="muted" data-reactid=".0.0.0.1.1.9.0.1">Students can have a live interactive chat.</span><p class="lead" data-reactid=".0.0.0.1.1.9.0.2">Addresses difficulty in sharing material in real-time.Students often have trouble taking notes at the same pace as the instructor. Students disrupting classroom with questions that can be easily answered by classmates.</p></div><div class="col-md-5" data-reactid=".0.0.0.1.1.9.1"><img class="feature-image featurette-image img-responsive center-block" src="/images/class-chat.jpg" alt="Chat" data-reactid=".0.0.0.1.1.9.1.0"></div></div></div>


## Real-time Feedback Loops
|**Feature**|**Problem**|**Solution**|
| :-------------: |:-------------:| :-----:|
| Thumb check      | Addresses difficulty of determining (in real-time) whether students understand material covered in presentation. | Teacher issues a thumb check during a presentation to assess whether students understand what is being taught. Results direct the teacher on whether he or she should elaborate on a topic or move on to the next one. |
| Quiz      | Address difficulty of determining (in real-time) whether students understand material covered in presentation.      |   Teachers can upload and edit quizzes in the platform, and broadcast them in real-time to dial in on students’ understanding of the important details of the presentation. The results are visualized in the teacher’s dashboard. |


## Communication Channels
|**Feature**|**Problem**|**Solution**|
| :-------------: |:-------------:| :-----:|
| Question     | Too many questions but not enough time to address each. Students too shy to ask questions. Students disrupting the classroom with questions that aren’t relevant for the entire class. | Students can share and upvote questions about the lecture. Teacher can select the questions in order of priority. |
| Chat      | Addresses difficulty in sharing material in real-time. Students often have trouble taking notes at the same pace as the instructor. Students disrupting classroom with questions that can be easily answered by classmates.      |   Allows students to interact with each other without disrupting the classroom. For instance,students can message classroom to share notes or ask for clarification. Allow teacher and students to share resources (such as links to related material) in real-time. |
| Video | Large lectures introduce a challenge for both students and lecturers. For teachers, who want to foster equal opportunity, it can be hard to notice and determine in which order students raised their hand. More importantly, it can be very difficult for members of the classroom to hear the student asking the question, if he or she does not have a microphone.      |    Students can enter a queue to ask a question which will be broadcasted from the front of the classrooms. Teacher can call an individual student and broadcast his or her video on the lecture screen.  |

## Technology Stack

|**Type**|**Implementation**| 
| :-------------: |:-------------:|
| Language     | Javascript | 
| Build      | Webpack      |
| Server-side | NodeJS, Express      |
| Database | Postgres, LouDB (deprecated)      |
| Client-side | React-Redux   |
| Additional dependencies | Chart.js, WebRTC   |





## Project Doc Links

Look at the project [Style Guide](/_STYLE_GUIDE.md) for more information.

