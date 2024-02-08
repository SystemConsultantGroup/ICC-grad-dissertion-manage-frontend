import axios from "axios";
import { redirect } from "next/navigation";
import { showNotificationError } from "@/components/common/Notifications";

// 브라우저에서 사용하는 싱글톤 Axios 객체
export const ClientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

ClientAxios.interceptors.request.use((request) => {
  console.log(`${request.method ?? "GET"} ${request.url} ${JSON.stringify(request.params ?? {})}`);
  return request;
});

ClientAxios.interceptors.response.use((response) => {
  console.log(`${response.status} ${response.statusText}`);
  return response;
});

ClientAxios.interceptors.response.use(
  (response) =>
    //TODO: 200 등 응답에 따른 메세지 알맞게 추가
    // if (response.status === 201) {
    //   showNotificationSuccess({
    //     message: response?.data.message,
    //   });
    // }
    Promise.resolve(response),
  (error) => {
    console.error(error);
    // 4xx, 5xx status code (오류 코드 발생) 시 할 일.

    // 로그인 JWT 만료 또는 없을 시 & 로그인 실패 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        showNotificationError({
          title: error.response?.statusText,
          message: error.response?.data.message,
        });
      }
      redirect("/login");
    }

    // 이외 기타 에러 처리
    const isNetworkError = error.message === "Network Error"; // 응답 자체가 불가한 서버가 내려간 상태인지 등
    const userErrorMessage = isNetworkError
      ? "서버 통신 오류가 발생했습니다."
      : error.response?.data?.message;

    if (typeof window !== "undefined") {
      showNotificationError({
        title: userErrorMessage,
        message: userErrorMessage,
      });
    }

    return Promise.reject(error);
  }
);
