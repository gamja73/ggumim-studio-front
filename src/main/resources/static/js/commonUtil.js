// 전화번호 형식 체크
const isValidPhoneNumber = phoneNumber => {
    const PHONE_REGEX = /^((010)-\d{4}-\d{4}|\+82 10-\d{4}-\d{4})$/;
    return matchesRegex(phoneNumber, PHONE_REGEX);
};

// 전화번호 형식 포메팅 (82 10-0000-0000 형식을 010-0000-0000 형식으로 변환)
const convertToLocalFormat = phoneNumber => {
    if (!phoneNumber || phoneNumber.length < 15)
    {
        return phoneNumber;
    }

    return `010-${phoneNumber.substring(6, 10)}-${phoneNumber.substring(11, 15)}`;
};

// 이메일 형식 체크
const isValidEmail = email => {
    const EMAIL_REGEX = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zAZ]{2,7}$/;
    return matchesRegex(email, EMAIL_REGEX);
};

// LocalDate 형식 체크
const isValidLocalDate = date => {
    const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;
    return matchesRegex(date, DATE_REGEX) && isValidDateOnly(date);
};

// LocalDateTime 형식 체크
const isValidLocalDateTime = dateTime => {
    const DATETIME_REGEX = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;

    if (!matchesRegex(dateTime, DATETIME_REGEX))
    {
        return false;
    }

    const [date, time] = dateTime.split(' ');
    return isValidLocalDate(date) && isValidTime(time);
};

// 날짜 형식 검증
const isValidDateOnly = date => {
    const [year, month, day] = date.split('-').map(Number);

    if (month < 1 || month > 12)
    {
        return false;
    }

    const maxDay = getMaxDayOfMonth(year, month);
    return day >= 1 && day <= maxDay;
};

// 윤년 여부 확인
const isLeapYear = year => (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));

// 월별 최대 일수 구하기
const getMaxDayOfMonth = (year, month) => {
    switch (month)
    {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        case 4: case 6: case 9: case 11:
            return 30;
        case 2:
            return isLeapYear(year) ? 29 : 28;
        default:
            return 0; // 잘못된 월이 들어오면 0 반환
    }
};

// 시간 검증 (시, 분, 초가 유효한지)
const isValidTime = time => {
    const [hour, minute, second] = time.split(':').map(Number);
    return hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && second >= 0 && second < 60;
};

// 정규 표현식 매칭 체크
const matchesRegex = (input, regex) => input != null && regex.test(input);

// 숫자 3자리마다 쉼표찍기
const formatNumberWithComma = number => number.toLocaleString();

// 현재 날짜 및 시간 반환 (yyyy-MM-dd HH:mm:ss 형식)
const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace('T', ' ');
};

// 문자열을 특정 길이로 자르기 (자르는 길이 초과시 '...' 추가)
const truncateString = (str, maxLength) => {
    if (!str || str.length <= maxLength)
    {
        return str;
    }

    return str.substring(0, maxLength) + '...';
};

// 문자열의 공백 제거 (모든 공백 제거)
const removeWhitespace = str => str ? str.replace(/\s+/g, '') : null;