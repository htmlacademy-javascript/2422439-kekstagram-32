const checkStringLength = (string, maxlength) => string.length <= maxlength;

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

const isPalindrome = (string) => {
  const cleaned = string.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < cleaned.length / 2; i++) {
    if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true

const searchNumber = (input) => {
  const string = input.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
    if (!Number.isNaN(number)) {
      result += number;
    }
  }
  return parseInt(result, 10);
};

searchNumber('2023 год'); // 2023
searchNumber('ECMAScript 2022'); // 2022
searchNumber('1 кефир, 0.5 батона'); // 105
searchNumber('агент 007'); // 7
searchNumber('а я томат'); // NaN
searchNumber(2023); // 2023
searchNumber(-1); // 1
searchNumber(1.5); // 15


function convertToMinutes(time) {
  const [hour, minutes] = time.split(':');
  const minutesInOneHour = 60;
  return hour * minutesInOneHour + parseInt(minutes, 10);
}

function checkMeetingTime(dayStart, dayEnd, meetingStart, meetingDuration) {
  const dayStartInMinutes = convertToMinutes(dayStart);
  const dayEndInMinutes = convertToMinutes(dayEnd);
  const meetingStartInMinutes = convertToMinutes(meetingStart);
  return meetingStartInMinutes >= dayStartInMinutes &&
  meetingStartInMinutes + meetingDuration <= dayEndInMinutes;
}

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120); // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:0', 90); // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false

