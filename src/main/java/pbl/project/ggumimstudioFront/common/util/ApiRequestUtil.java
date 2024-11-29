//package pbl.project.ggumimstudioFront.common.util;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import okhttp3.*;
//import pbl.project.ggumimstudioFront.common.error.CustomErrorCode;
//import pbl.project.ggumimstudioFront.common.error.CustomException;
//
//import java.io.IOException;
//
//public class ApiRequestUtil
//{
//    private final OkHttpClient httpClient = new OkHttpClient();
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    /**
//     * API 호출
//     * @param url          호출할 API URL
//     * @param accessToken  인증 토큰 (없으면 null 또는 빈 문자열)
//     * @param requestBodyDto 요청 바디에 들어갈 DTO
//     * @param responseClass 응답을 매핑할 DTO 클래스
//     * @param <T>          요청 DTO 타입
//     * @param <R>          응답 DTO 타입
//     * @return 매핑된 응답 DTO 객체
//     * @throws IOException 호출 또는 매핑 중 오류 발생 시 예외 발생
//     */
//    public <T, R> R callAPI(String url, String accessToken, T requestBodyDto, Class<R> responseClass) throws IOException
//    {
//        // Body 에 들어갈 데이터 문자열로 변환
//        String jsonBody = objectMapper.writeValueAsString(requestBodyDto);
//
//        // RequestBody 생성
//        RequestBody body = RequestBody.create(jsonBody, MediaType.get("application/json; charset=utf-8"));
//
//        // Request
//        Request.Builder requestBuilder = new Request.Builder()
//                .url(url)
//                .post(body);
//
//        // Access Token 이 있으면 header 에 포함, 없으면 안넣음
//        if (accessToken != null && !accessToken.isEmpty())
//        {
//            requestBuilder.addHeader("Authorization", "Bearer " + accessToken);
//        }
//
//        Request request = requestBuilder.build();
//
//        // API 호출
//        try (Response response = httpClient.newCall(request).execute())
//        {
//            if (!response.isSuccessful())
//            {
//                throw new CustomException(CustomErrorCode.TOKEN_NOT_FOUND);
//            }
//
//            // body 가 null 아니면 responseClass DTO 로 매핑
//            if (response.body() != null)
//            {
//                String responseBody = response.body().string();
//                return objectMapper.readValue(responseBody, responseClass);
//            }
//            else
//            {
//                return null;
//            }
//        }
//    }
//}
