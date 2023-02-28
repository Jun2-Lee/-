export default function Login2() {
        const REST_API_KEY = "e14465c8dab22961a692f89cdcfb540b";
        const REDIRECT_URI = "https://naong-ca2e5.web.app/oauth/kakao/callback";
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email`;
    return (
        <div className='login_container'>
            <a href={KAKAO_AUTH_URL}>카카오로 로그인</a>
        </div>
    );
}