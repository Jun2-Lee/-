import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const REST_API_KEY = "e14465c8dab22961a692f89cdcfb540b";
    const REDIRECT_URI = "https://naong-ca2e5.web.app/oauth/kakao/callback";
    const CLIENT_SECRET = "CuVZ4eSZHgGvhCjMlUzhFaYIycCnX4Xb";

  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code)
      
  const history = useNavigate();

  /*
  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });

    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );

      // Kakao Javascript SDK 초기화
      if (!window.Kakao.isInitialized()) {
      window.Kakao.init(REST_API_KEY);
      }
      
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      history("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return null; */
};

export default Auth;