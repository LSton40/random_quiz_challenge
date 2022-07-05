var quiz = [
    {
        'question': 'What is your name?', 
        'answers': {
            'correct': 'Arthur, King of the Britains',
            'bogus1': 'Hank, of the Ostrich People',
            'bogus2': 'Laertia, Queen of Atlantis',
            'bogus3': 'Smith, Agent Smith'
        }
    }, 
    {
        'question': 'What is your quest?',
        'answers': { 
            'correct': 'To seek the Grail',
            'bogus1': 'To find a good parking space',
            'bogus2': 'To dance the tarantella',
            'bogus3': 'To eat a donut'
        }
    }, 
    {
        'question': 'What is your favorite color?',
        'answers': {
            'correct': 'Blue',
            'bogus1': 'Yellow, no wait...',
            'bogus2': 'Seven',
            'bogus3': 'Fuschia'
        }
    }, 
    {
        'question': 'What is the capital of Assyria?', 
        'answers': {
            'correct': 'Ashur',
            'bogus1': 'Babylon',
            'bogus2': 'London',
            'bogus3': 'Peking'
        }
    }, 
    {
        'question': 'What is the airspeed velocity of an unladen swallow?', 
        'answers': {
            'correct': 'African or European?',
            'bogus1': '24m per second',
            'bogus2': '100 miles per second',
            'bogus3': 'Larry'
        }
    },
    {
        'question': "Who's on First?", 
        'answers': {
            'correct': 'Yes.',
            'bogus1': 'I am',
            'bogus2': "I don't know",
            'bogus3': 'What'
        }
    },
    {
        'question': "A hospital, what's that?", 
        'answers': {
            'correct': "A large building with patients, but that's not important right now",
            'bogus1': 'A sandwich',
            'bogus2': 'Yellow',
            'bogus3': "Don't call me Shirley"
        }
    },
    {
        'question': "Nervous? First time?", 
        'answers': {
            'correct': "No, I've been nervous lots of times",
            'bogus1': 'Shirley',
            'bogus2': "A swallow",
            'bogus3': 'Yes'
        }
    },
    {
        'question': "What's the meaning of life?", 
        'answers': {
            'correct': 'Salmon steaks (think about it)',
            'bogus1': "I don't want to think about it",
            'bogus2': "I don't like salmon",
            'bogus3': 'Why do you ask?'
        }
    },
    {
        'question': "Is this quiz fair?", 
        'answers': {
            'correct': 'No, of course not.',
            'bogus1': 'Yes, it must be',
            'bogus2': "Blue",
            'bogus3': 'Seven'
        }
    }
];

var holding = [];
var score;
var count;

var pressButton = document.querySelector('#startButton');
var zenith = document.getElementById('clock');
var quizMain = document.getElementById('quizTemplate');
var timerHeader = document.getElementById('timeHead');
var introCard = document.getElementById('introCard');
var scoreCard = document.getElementById('score');
var qHeading = document.getElementById('qHeading');
var pEl = document.getElementById('qText');
var butDiv = document.getElementById('butWrapper');
var butClass = document.querySelectorAll('.butSelect');
var buttons = butDiv.getElementsByTagName('button');
var answCorrect = document.querySelector('.right');
var answIncorrect = document.querySelectorAll('.wrong');
var corrFdback = document.querySelector('#inCorrect');
var gameEnd = document.getElementById('gameOver');
var formSubmit = document.getElementById('submitBut');
var rankings = document.querySelector('#rankings');
var restart = document.getElementById('startAgain');
var butAgain = document.getElementById('tryAgain');
var clearHome = document.getElementById('clearScores');
    
//Primary function: randomly selects question from quiz array
function randomizer() {

   function quesCounter() {
        var k;
        for (k=0; k < holding.length + 2; k++) {
            qHeading.textContent = 'Question ' + k;
        }
    };
    quesCounter();

//Randomly selects one of the questions (+ answers) from the Quiz array
    function firstQuestion () {
        var i = Math.floor(Math.random() * quiz.length);
        var qSelect = quiz[i];
        return qSelect;
    };

    var qNew = firstQuestion();
    pEl.textContent = qNew.question;

    //Shuffles the answers for the given question
    function mixItUp() {
        function randomizeAnswers() {
            var keys = Object.values(qNew.answers);
            var vals = Object.values(keys);
            var ranVals = [];
            var i = vals.length;
            var j = 0;
    
            while (i--) {
                j = Math.floor(Math.random() * (i+1));
                ranVals.push(vals[j]);
                vals.splice(j, 1);
            }
            return ranVals;
        }
        return randomizeAnswers();
    };
    
    var qAnsw = mixItUp();

    //Assigns the shuffled answers to the answer buttons; tags the correct answer with the 'right' class and the rest with the 'wrong' class.
    function ranAnswers() {
        for (i=0; i < qAnsw.length; i++) {
            butClass[i].textContent = qAnsw[i];
        };
            
        for (i=0; i < qAnsw.length; i++) {
            if (butClass[i].textContent == qNew.answers.correct) {
                butClass[i].classList.add('right');
            } else {
                butClass[i].classList.add('wrong');
            };
        };
            
        var answCorrect = document.querySelector('.right');
        var answIncorrect = document.querySelectorAll('.wrong');

        //Removes the selected question (+answers) from the quiz array, so it is not selected again. Holds spliced items in a temporary array.
        var tempSplice = quiz.splice(quiz.indexOf(qNew), 1);
        holding.push(tempSplice);
           
            
        //Function of the 'right' button: clicking on the correct answer adds to the score and goes to next question.
        answCorrect.onclick = function() {
            score++;
            scoreCard.innerText = 'Score: ' + score;
            corrFdback.textContent = 'Correct!';
            function showFeed() {
                corrFdback.textContent = '';
            }
            setTimeout(showFeed, 1000);
              
            for(i=0; i < buttons.length; i++){
                buttons[i].classList.remove('right');
                buttons[i].classList.remove('wrong');
            }

            if (quiz.length == 0) {
                zenith.style.visibility = 'hidden';
                quizMain.style.display = 'none';
                gameEnd.style.display = 'flex';
                quiz = holding.map(function(item) {
                    return item[0];
                });
                holding.splice(0, 5);
            } else {
                return randomizer(quiz);
            }
        };

        //Function of the 'wrong' buttons: clicking on any of the wrong answers decrements the time and goes to the next question
        for (i=0; i < answIncorrect.length; i++) {
            answIncorrect[i].onclick = function() {
                corrFdback.textContent = 'Wrong!';
                function showFeed() {
                    corrFdback.textContent = '';
                }
                setTimeout(showFeed, 1000);

                count -= 3;

                for(i=0; i < buttons.length; i++){
                    buttons[i].classList.remove('right');
                    buttons[i].classList.remove('wrong');
                }
                        
                if (quiz.length == 0) {
                    zenith.style.visibility = 'hidden';
                    quizMain.style.display = 'none';
                    gameEnd.style.display = 'flex';
                    quiz.splice(0, 1);
                    quiz = holding.map(function(item) {
                        return item[0];
                    });
                    holding.splice(0, 5);
                } else {
                    return randomizer(quiz);
                }
            };
        };
    
    };

    ranAnswers();
        
}

//Timer function - called when pressButton is clicked. Timer is stopped when it reaches 0 or when the last question is responded to.
var timer;
function countdown() {
    if (count < 10) {
        zenith.style.color = 'rgb(158, 13, 13)';
    } else {
        zenith.style.color = 'black';
    }
    if (count === 0) {
        clearInterval(this);
        zenith.style.visibility = 'hidden';
        quizMain.style.display = 'none';
        gameEnd.style.display = 'flex';
    } else if (holding.length === 0) {
        clearInterval(this);
    } else {
        zenith.innerHTML = count + ' seconds remaining';
        count--;
    }
};

//Function that starts quiz.
function elsen() {
    introCard.style.display = 'none';
    quizMain.style.display = 'flex';
    scoreCard.style.visibility = 'visible';
    zenith.style.visibility = 'visible';
    restart.style.display = 'none';
    score = 0
    scoreCard.innerText = 'Score: ' + score;
    count = 60;
    timer = setInterval(countdown, 1000);
};

//Function that restarts quiz from beginning.
function backToStart() {
    introCard.style.display = 'flex';
    zenith.style.visibility = 'hidden';
    scoreCard.style.visibility = 'hidden';
    restart.style.display = 'none';
    score = 0
    scoreCard.innerText = 'Score: ' + score;
};

//Button on load screen that activates the quiz
pressButton.addEventListener('click', randomizer); 
pressButton.addEventListener('click', elsen);

//Button to submit initials and score to local storage and end the quiz.
formSubmit.addEventListener('click', function (event) {
    restart.style.display = 'flex';
    gameEnd.style.display = 'none';
    clearInterval(timer);
    event.preventDefault();

    var initialsInput = document.querySelector('#initials').value;

    if (score >= localStorage.getItem('score')) {
        localStorage.setItem('winner', initialsInput);
        localStorage.setItem('score', score);
    };    
    
    var leader = localStorage.getItem('winner');
    var scorage = localStorage.getItem('score');
    rankings.innerHTML = leader + ' scored ' + scorage;

});

//Button to retain highest score in local storage and restart quiz
butAgain.addEventListener('click', backToStart);

//Button to clear local storage of all scores and restart quiz.
clearHome.addEventListener('click', backToStart);
clearHome.addEventListener('click', function () {
    localStorage.clear('winner');
    localStorage.clear('score');
});
