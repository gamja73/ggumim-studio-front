package pbl.project.ggumimstudioFront.common.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonUtil
{
    // 전화번호 형식 정규 표현식
    private static final String PHONE_REGEX = "^((010)-\\d{4}-\\d{4}|\\+82 10-\\d{4}-\\d{4})$";
    // 이메일 형식 정규 표현식
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    // LocalDate 형식 정규 표현식
    private static final String DATE_REGEX = "^(\\d{4})-(\\d{2})-(\\d{2})$";
    // LocalDateTime 형식 정규 표현식
    private static final String DATETIME_REGEX = "^(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})$";

    /**
     * 전화번호 형식 체크
     *
     * @param phoneNumber - 검사할 전화번호
     * @return 전화번호 형식이 맞으면 true, 아니면 false
     */
    public boolean isValidPhoneNumber(String phoneNumber)
    {
        return matchesRegex(phoneNumber, PHONE_REGEX);
    }

    /**
     * 전화번호 형식 포매팅 (예: +82 10-0000-0000 -> 010-0000-0000)
     *
     * @param phoneNumber - 포맷을 변경할 전화번호
     * @return 변경된 전화번호
     */
    public String convertToLocalFormat(String phoneNumber)
    {
        if (phoneNumber == null || phoneNumber.length() < 15)
        {
            return phoneNumber;
        }

        return "010-" + phoneNumber.substring(6, 10) + "-" + phoneNumber.substring(11, 15);
    }

    /**
     * 이메일 형식 체크
     *
     * @param email - 검사할 이메일
     * @return 이메일 형식이 맞으면 true, 아니면 false
     */
    public boolean isValidEmail(String email)
    {
        return matchesRegex(email, EMAIL_REGEX);
    }

    /**
     * LocalDate 형식 체크 (yyyy-MM-dd)
     *
     * @param date - 검사할 날짜
     * @return 날짜 형식이 맞으면 true, 아니면 false
     */
    public boolean isValidLocalDate(String date)
    {
        return matchesRegex(date, DATE_REGEX) && isValidDateOnly(date);
    }

    /**
     * LocalDateTime 형식 체크 (yyyy-MM-dd HH:mm:ss)
     *
     * @param dateTime - 검사할 날짜 및 시간
     * @return 날짜 및 시간 형식이 맞으면 true, 아니면 false
     */
    public boolean isValidLocalDateTime(String dateTime)
    {
        if (!matchesRegex(dateTime, DATETIME_REGEX))
        {
            return false;
        }

        String[] dateTimeParts = dateTime.split(" ");
        return isValidLocalDate(dateTimeParts[0]) && isValidTime(dateTimeParts[1]);
    }

    /**
     * 날짜 형식 검증 (yyyy-MM-dd)
     *
     * @param date - 날짜
     * @return 날짜가 유효한 날짜이면 true, 아니면 false
     */
    private boolean isValidDateOnly(String date)
    {
        String[] dateParts = date.split("-");
        int year = Integer.parseInt(dateParts[0]);
        int month = Integer.parseInt(dateParts[1]);
        int day = Integer.parseInt(dateParts[2]);

        if (month < 1 || month > 12)
        {
            return false;
        }

        int maxDay = getMaxDayOfMonth(year, month);
        return day >= 1 && day <= maxDay;
    }

    /**
     * 윤년 여부 확인
     *
     * @param year - 검사할 연도
     * @return 윤년이면 true, 아니면 false
     */
    private static boolean isLeapYear(int year)
    {
        return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)); // 윤년 계산
    }

    /**
     * 월별 최대 일수 구하기
     *
     * @param year  - 연도
     * @param month - 월
     * @return 해당 월의 최대 일수
     */
    private int getMaxDayOfMonth(int year, int month)
    {
        return switch (month)
        {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11 -> 30;
            case 2 -> isLeapYear(year) ? 29 : 28;
            default -> 0;
        };
    }

    /**
     * 시간 검증 (시, 분, 초가 유효한지)
     *
     * @param time - 시간 (HH:mm:ss 형식)
     * @return 유효한 시간 형식이면 true, 아니면 false
     */
    private boolean isValidTime(String time)
    {
        String[] timeParts = time.split(":"); // 시, 분, 초로 분리
        int hour = Integer.parseInt(timeParts[0]);
        int minute = Integer.parseInt(timeParts[1]);
        int second = Integer.parseInt(timeParts[2]);

        return hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && second >= 0 && second < 60;
    }

    /**
     * 정규 표현식 매칭 체크
     *
     * @param input - 입력값
     * @param regex - 매칭할 정규식
     * @return 정규식에 맞으면 true, 아니면 false
     */
    private boolean matchesRegex(String input, String regex)
    {
        if (input == null)
        {
            return false;
        }

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        return matcher.matches();
    }

    /**
     * 숫자 3자리마다 쉼표 찍기
     *
     * @param number - 숫자
     * @return 쉼표가 찍힌 숫자 문자열
     */
    public String formatNumberWithComma(Integer number)
    {
        return String.format("%,d", number);
    }

    /**
     * 현재 날짜 및 시간 반환 (yyyy-MM-dd HH:mm:ss 형식)
     *
     * @return 현재 날짜 및 시간
     */
    public String getCurrentDateTime()
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(new Date());
    }

    /**
     * 문자열을 특정 길이로 자르기 (자르는 길이 초과시 '...' 추가)
     *
     * @param str       - 자를 문자열
     * @param maxLength - 최대 길이
     * @return 잘린 문자열 (길이 초과 시 '...' 추가)
     */
    public String truncateString(String str, Integer maxLength)
    {
        if (str == null || str.length() <= maxLength)
        {
            return str;
        }

        return str.substring(0, maxLength) + "...";
    }

    /**
     * 문자열의 공백 제거 (모든 공백 제거)
     *
     * @param str - 공백을 제거할 문자열
     * @return 공백이 제거된 문자열
     */
    public String removeWhitespace(String str)
    {
        if (str != null)
        {
            return str.replaceAll("\\s+", "");
        }

        return null;
    }
}
