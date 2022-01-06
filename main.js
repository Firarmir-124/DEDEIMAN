const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const options = document.querySelectorAll('.option');

const question = document.getElementById('question'),
        numberOFquestion = document.getElementById('number-of-question'),
        numberOfAllQuestion = document.getElementById('number-of-all-questions');


let indexOfQuestion,
    indexOfPage = 0;


const answersTracker = document.getElementById('answers-tracker'); // количество правильных и не правильных ответов 
const btnNext = document.getElementById('btn-next'); //кнопка для перехода на следующий вопрос
    
let score = 0; // итоговый результат  викторины 
    
const correctAnswer = document.getElementById('correct-answer'), // количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //количество всех вопрос в модальном окне
      btnTryAgain = document.getElementById('btn-try-again'), // Начать викторину заново
      txtQuez = document.getElementById('txt-quez'); //Победное слово

const quizOverModal = document.querySelector('.quiz-over-modal');
const img = document.querySelector('.img img');

const questions = [
    {
        question: 'На чем летают люди в космос?',
        options: [
            'На ракете',
            'На машине времени',
            'на самолёте',
            'космоса нет',
        ],
        rightAnswer: 0
    },
    {
        question: 'Как называют людей летающих в космос?',
        options: [
            'Физик',
            'Водитель',
            'Учитель',
            'Космонафт',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что люди делают в космосе?',
        options: [
            'изучают математику',
            'Играют',
            'Проводят исследования',
            'ничего не делают их там нет',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая страна первой отправила космонавта в космос?',
        options: [
            'Россия',
            'США',
            'Германия',
            'Кыргызстан',
        ],
        rightAnswer: 0
    }
];

numberOfAllQuestion.innerHTML = questions.length; // Кол вопросов

let load = function() {
    question.innerHTML = questions[indexOfQuestion].question;
    //Добавляем ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOFquestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
}

let complatedAnsewer = []; //Массив для заполненеия уже заданных вопросов

let randomQuestion = function() {
    let randomNum = Math.floor( Math.random() * questions.length );
    let hitDublication = false; //Якорь для проверки одинаковых вопросов

    if (indexOfPage == questions.length) {
        quizOver()
    } else {
        if (complatedAnsewer.length > 0) {
            complatedAnsewer.forEach(function(item) {
                if (item == randomNum) {
                    hitDublication = true;
                }
            });
            if (hitDublication) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNum;
                load();
            }
        }
        if (complatedAnsewer.length == 0) {
            indexOfQuestion = randomNum;
            load();
        }

    }
    complatedAnsewer.push(indexOfQuestion);
}


let cheikAnsewer = function(el) {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        score++;
        updateAnswersTrackers('correct')
    } else {
        el.target.classList.add('wrong');
        updateAnswersTrackers('wrong')
    }
    disabledOption();
}


for (option of options) {
    option.addEventListener('click', function(el) {cheikAnsewer(el)});
}

let disabledOption = function() {
    options.forEach(function(item) {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct')
        }
    })
};

let enableOptions = function() {
    options.forEach(function(item) {
        item.classList.remove('disabled','correct','wrong');
    })
}

let volidate = function() {
    if(! options[0].classList.contains('disabled')) {
        alert('Выберите одно из полей ответов !')
    } else {
        enableOptions();
        randomQuestion();
    }
}

let answersTrackers = function() {
    questions.forEach(function() {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

let updateAnswersTrackers = function(status) {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

btnNext.addEventListener('click', function() {
    volidate();
})

let quizOver = function() {
    quizOverModal.classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
    if (score < 2) {
        document.querySelector('h1').innerHTML = 'Плохой результат !'
        img.src = './img/false.svg';
    } else {
        document.querySelector('h1').innerHTML = 'Хороший результат !'
        txtQuez.innerHTML = 'пуська'
    }
}

let reloadQuizOver = function() {
    window.location.reload();

}

btnTryAgain.addEventListener('click', reloadQuizOver)


window.addEventListener('load', function() {
    randomQuestion();
    answersTrackers();
})