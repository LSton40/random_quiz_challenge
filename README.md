# random_quiz_challenge

##Challenge Criteria
```
Create a quiz leaning heavily on JavaScript.
The quiz is timed; each wrong answer deducts time from the remaining total.
Upon answering each question, the next question is queued up.
The quiz ends when all questions are answered or the timer reaches 0.
When the quiz ends--by finishing all questions or when the timer is up--the user may enter their initials, which are saved with their score.
```

##Quiz design
```
The current quiz is multiple choice and double-randomized:
On each attempt, the user is presented with the questions in a different order.
The answer choices to each question are also randomly shuffled: the user must read the answers carefully.
The user's score is compared with the previously saved score. Whichever is highest is saved to internal storage.
If the user's score is highest, they will see their initials and score displayed at the end of the quiz.
The user has the option of trying to take the quiz again with the current score standings or they may wipe all previous scores and try again from scratch.
```
