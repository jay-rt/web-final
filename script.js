let quiz = document.querySelector('.quiz');
let trivia = document.querySelector('#question-template');
let clone = document.importNode(trivia.content, true);
quiz.appendChild(clone);

let correct_answer
let answer = document.querySelectorAll('.main-quiz > .quiz > .options > .ans')
let score = 0
let count = 1

document.querySelector('#score').innerHTML = score

for(let i = 0; i< answer.length; i++){
    answer[i].addEventListener("click", e => {
        document.querySelector('.question-no').classList.toggle('flipX');
        document.querySelector('.question').classList.toggle('flipX');
        document.querySelector('.options').classList.toggle('flipY');

        let clickedAns = e.currentTarget.innerHTML;
        if(clickedAns == correct_answer){
            score += 5
            document.querySelector('#score').innerHTML = score
        }
        count++
        document.querySelector('.main-quiz > .quiz > .question-no > h1').innerHTML = 'Question '+ count.toString()

        setTimeout(() => {
            document.querySelector('.question-no').classList.toggle('flipX');
            document.querySelector('.question').classList.toggle('flipX')
            document.querySelector('.options').classList.toggle('flipY')
        },1000)

        nextQue();
    })
}


function nextQue() {
    
    fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let question = data.results[0].question
        correct_answer = data.results[0].correct_answer
        let ans = data.results[0].incorrect_answers
        ans.push(correct_answer)
        shuffle(ans)

        document.querySelector('.main-quiz > .quiz > .question > h1').innerHTML = question

        
        for (let i = 0; i< ans.length; i++){
            answer[i].innerHTML = ans[i]
        }
    });
}


var shuffle = function (array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

let nam = document.querySelector('.user-prompt')
nam.addEventListener("click", () => {
    nam.classList.toggle('fade')
    setTimeout(() => {
        nam.classList.toggle('hidden')
        nam.classList.toggle('fade')
        document.querySelector('.form').classList.toggle('hidden');
    },600)
})


let user_info = document.querySelector('.top > .user-info');
let user_name = document.querySelector('.top > .user-info > .info > h1');

let name_submit = document.querySelector('#username');
name_submit.addEventListener("submit", e => {
    e.preventDefault();
    document.querySelector('.form').classList.toggle('flip2X')
    let name = document.querySelector('#name').value
    localStorage.setItem('username',name)
    user_name.innerHTML = localStorage.getItem('username')
    setTimeout(() => {
        document.querySelector('.form').classList.toggle('hidden')
        document.querySelector('.form').classList.toggle('flip2X')
        user_info.classList.toggle('hidden') 
    }, 1000) 
})

let del = document.querySelector('.del');
del.addEventListener("click", () => {
    localStorage.clear();
    score = 0;
    document.querySelector('#score').innerHTML = score
    count = 1;
    document.querySelector('.main-quiz > .quiz > .question-no > h1').innerHTML = 'Question '+ count.toString()
    document.querySelector('.user-info').classList.toggle('slideIn')
    setTimeout(() => {
        document.querySelector('.user-info').classList.toggle('hidden')
        document.querySelector('.user-info').classList.toggle('slideIn')
        document.querySelector('.user-prompt').classList.toggle('hidden')
    }, 750)
})


if(localStorage.getItem('username') != null){
    nam.classList.toggle('hidden')
    user_name.innerHTML = localStorage.getItem('username')
    document.querySelector('.user-info').classList.toggle('hidden')
}
nextQue();