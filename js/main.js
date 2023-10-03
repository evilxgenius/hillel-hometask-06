// Створити скрипт яки повинен виконувати наступне:
//
// - запитати у користувача рік народження;
// - запитати в нього, в якому місті він живе;
// - запитати його улюблений вид спорту.
//
// При натисканні на ОК показуємо вікно, де має бути відображена наступна інформація:
//
// - його вік
// - якщо користувач вкаже Київ, Вашингтон чи Лондон,
//   то показати йому повідомлення - "Ти живеш у столиці..."
//   і на місце точок підставляємо країну, столицею якої є місто. Інакше
//   показуємо йому “ти живеш у місті…”, де місце точок – введене місто.
// - Вибираємо самі три види спорту та три чемпіони у цих видах. Відповідно,
//   якщо користувач вкаже один із цих видів спорту,
//   то показуємо йому повідомлення “Круто! Хочеш стати …?
//   і підставляємо на місце точок ім'я та прізвище чемпіона.
//
// Все це має бути відображено в одному вікні (алерті).
// Якщо в якомусь випадку він не захоче вводити інформацію і натисне Скасувати,
// показати йому повідомлення – “Шкода, що Ви не захотіли ввести свій(ю) …”
// і вказуємо, що він не захотів вводити – дату народження, місто чи вид спорту.

const wrongPromptInputAlert = (answer, subject) => {
    alert(`You entered <${answer}>. Please enter ${subject}!`);
}

/**
* Ask user something via prompt
* @param   {string}      question    what do you want to ask?
* @param   {string}      subject     will be inserted to 'Oh, It's so sad that you didn't enter your ${subject} alert.', If user presses "Cancel"
* @param   {function}    predicateFn checks the validity of data from user
* @returns {string|null} the result of the prompt input or null if the user presses "Cancel"
*/
const askUserPrompt = (question, subject, predicateFn) => {
    let answer;

    do {
        answer = prompt(question);

        if (answer == null) {
            alert(`Oh, It's so sad that you didn't enter <${subject}>.`);
            return null;
        }
    } while (!predicateFn(answer));

    return answer;
}

const userCityToMessage = (city) => {
    let message;
    let messagePrefix = 'You live in';

    switch (city.trim()) {
        case 'Kyiv':
            message = `${messagePrefix} the capital of Ukraine - ${city}`;
            break;
        case 'Washington':
            message = `${messagePrefix} the capital of USA - ${city}`;
            break;
        case 'London':
            message = `${messagePrefix} the capital of Great Britain - ${city}`;
            break;
        default:
            message = `${messagePrefix} city of ${city}`;
    }

    return message;
}
const userSportToMessage = (sport) => {
    let message = `Your favorite sport is ${sport}`;
    let messageForChampion = '. Cool! Do you want to become like';

    switch (sport.trim().toLowerCase()) {
        case 'fishing':
            message += `${messageForChampion} Nazan Bozhenko?`;
            break;
        case 'swimming':
            message += `${messageForChampion} Michael Phelps?`;
            break;
        case 'armwrestling':
            message += `${messageForChampion} Oleg Zhokh?`;
            break;
    }

    return message;
}


const userAge = askUserPrompt('What is your year of birth?', 'year of birth', (answer) => {
    let currYear = new Date().getFullYear();

    switch (true) {
        case answer.trim().length === 0: // empty input (include spaces)
        case Object.is(+answer, NaN): // input is a NaN
        case +answer > currYear: // input is a number but it higher than current year
            wrongPromptInputAlert(answer, `a year of birth, not higher than ${currYear}`);
            return false; // break is redundant
        default:
            return true;
    }
});

const userCity = askUserPrompt('What city do you live in?', 'city', (answer) => {
    if (answer.trim().length === 0) { // empty input (include spaces)
        wrongPromptInputAlert(answer, `a name of where you live`);
        return false; // break is redundant
    } else {
        return true;
    }
});

const userSport = askUserPrompt( 'What is your favorite sport?', 'favorite sport', (answer) => {
    if (answer.trim().length === 0) {// empty input (include spaces)
        wrongPromptInputAlert(answer, `favorite sport`);
        return false; // break is redundant
    } else {
        return true;
    }
});

let userInfo = '';

userInfo += userAge ?
    `Your are ${(new Date().getFullYear()) - userAge} year old` :
    "You didn't entered your year of birth";
userInfo += "\n\n"
userInfo += userCity ?
    userCityToMessage(userCity) :
    "You didn't entered the name of city where you live";
userInfo += "\n\n"
userInfo += userSport ?
    userSportToMessage(userSport) :
    "You didn't entered the name of favorite sport";

alert(userInfo);
alert('Bye!');
