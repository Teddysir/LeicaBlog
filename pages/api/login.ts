import axios from "axios";
import { InputForm } from "@/container/adminLoginPage/LoginPage";
import { encrypt } from "@/utils/crypto";
// import secureLocalStorage from "react-secure-storage";

export const adminLoginApi = async (form: InputForm) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      memberId: form.id,
      password: form.password,
      withCredentials: true,
    });

    // 로그인 성공할시 Nts-Leica-Login 이라는 string을 AES 암호화 알고리즘으로 암호화하여 세션스토리지에 저장
    if (res.status == 200) {
      alert("관리자 로그인 성공");
      const encryptedData = encrypt("Nts-Leica-Login");
      sessionStorage.setItem("nts-microscope", encryptedData);
      window.location.replace("/");
    }
    return res;
  } catch (err) {
    alert("아이디 또는 비밀번호가 틀렸습니다.");
    return null;
  }
};
