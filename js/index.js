const rangeInput = document.getElementById('level_input');
const makeWishButton = document.getElementById('make-wish');
const maxNumberValue = document.querySelectorAll('#max-number');
const makeWishWrapper = document.querySelector('.make_wish_wrapper');
const resetButton = document.getElementById('reset-button');
const numInput = document.getElementById('num_input');
const resultButton = document.getElementById('result');
const resultContainer = document.getElementById('result_container');

let randomNumber = 0;
let tries = 0;
let totalTries = 0;

// Загадываем случайное число
function guessNumber() {
    randomNumber = Math.ceil(Math.random() * (+rangeInput.value));
    makeWishButton.style.display = 'none';
    makeWishWrapper.style.display = 'flex';
    console.log(randomNumber);
}

// Сброс
function reset() {
    randomNumber = 0;
    tries = 0;
    totalTries = 0;
    makeWishButton.style.display = 'block';
    makeWishWrapper.style.display = 'none';
    resultContainer.style.transform = 'translateX(150%)';
    resultContainer.style.transition = '.2s ease';
}

// Проверяем результат
function getResult() {
    if (numInput.value.trim()) {
        numInput.classList.remove('error_num_input');
        numInput.classList.add('num_input');
        resultContainer.style.transform = 'translateX(0)';
        resultContainer.style.transition = '.2s ease';

        if (randomNumber !== 0) {
            tries++;
            totalTries++;
        }

        printResult();
        if (tries === 3) tries = 0;
        numInput.value = '';
    } else {
        numInput.classList.remove('num_input');
        numInput.classList.add('error_num_input');
        resultContainer.style.transform = 'translateX(150%)';
        resultContainer.style.transition = '.2s ease';
    }

    // Проверка на четность
    function isEven(num) {
        return num % 2 === 0;
    }

    // Выводим результат
    function printResult() {
        if (randomNumber === 0) {
            resultContainer.innerHTML = `
                <div class="error_result_content">
                    <div class="result_title">Сперва загадайте число</div>
                </div>
            `
        } else if (randomNumber === (+numInput.value)) {
            resultContainer.innerHTML = `
                <div class="correct_result_container">
                    <div class="result_title">Все верно! Загаданное число <span class="result_num">${numInput.value}</span></div>
                    <div class="result_title">Вы угадали с ${totalTries} попытки</div>
                    <button id="new-game" type="button" class="button">Еще раз</button>
                </div>
            `
            document.getElementById('new-game').addEventListener('click', reset);
        } else {
            resultContainer.innerHTML = `
                <div class="error_result_content">
                    <div class="result_title">Попытка ${totalTries}. Ваше число <span class="result_num">${numInput.value}</span></div>
                    <div class="result_title">Загаданное число ${randomNumber > numInput.value ? 'больше' : 'меньше'} введенного</div>
                    <div class="${tries === 3 ? "even_hint" : "hidden"}">Загаданное число является ${isEven(randomNumber) === true ? 'четным' : 'нечетным'}</div>
                </div>
            `
        }
    }
}

maxNumberValue.forEach((num) => num.innerHTML = rangeInput.value);
makeWishButton.addEventListener('click', guessNumber);
resetButton.addEventListener('click', reset);
rangeInput.addEventListener('click', () => maxNumberValue.forEach((num) => num.innerHTML = rangeInput.value));
rangeInput.addEventListener('touchend', () => maxNumberValue.forEach((num) => num.innerHTML = rangeInput.value));
resultButton.addEventListener('click', getResult);