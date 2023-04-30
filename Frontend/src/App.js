import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//0(home)
import Home from "./pages/home";
import Layout from "./components/Layout";
import Calendar from "./pages/calendar";
//1
import Login from "./pages/1auth/login";
import InitialInfo from "./pages/1auth/initial_info";
import Signup from "./pages/1auth/signup";
//2(나눔)
import SharingPage from "./pages/2sharing";
import DetailSharing from "./pages/2sharing/detail_sharing";
import PostSharing from "./pages/2sharing/post_sharing";
import Revisesharing from "./pages/2sharing/revise_sharing"
//3(n빵)
import DutchPayPage from "./pages/3dutchpay";
import PostDutchpay from "./pages/3dutchpay/post_dutchpay";
//4(공동구매)
import GroupBuyingPage from "./pages/4groupbuying";
import DetailGroupBuying from "./pages/4groupbuying/detail_groupBuying";
import PostgroupBuying from "./pages/4groupbuying/post_groupBuying";
import RevisegroupBuying from "./pages/4groupbuying/revise_groupBuying"
//5
import MyPage from "./pages/5mypage";
import EditProfile from "./pages/5mypage/edit_profile";
import MyWriting from "./pages/5mypage/myWriting";
import Chatting from "./pages/5mypage/chatting"

//로그인 테스트
import Login2 from "./pages/test";
import Auth from "./pages/test/Auth";
import Profile from "./pages/test/profile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/initialInfo" element={<InitialInfo />} />
        <Route path="/signup" element={<Signup />} />


          <Route path="/calendar" element={<Calendar />} />

   
        <Route path="/sharing" element={<SharingPage />} />
        <Route path="/sharing/:postId" element={<DetailSharing />} />
        <Route path="/postSharing" element={<PostSharing />} />
        <Route path="/reviseSharing/:postId" element={<Revisesharing />} />
        
        <Route path="/dutchPay" element={<DutchPayPage />} />
        <Route path="/postDutchpay" element={<PostDutchpay />} />


        <Route path="/groupBuying" element={<GroupBuyingPage />} />
        <Route path="/groupBuying/:postId" element={<DetailGroupBuying />} />
        <Route path="/postGroupBuying" element={<PostgroupBuying />} />
        <Route path="/reviseGroupBuying/:postId" element={<RevisegroupBuying />} />

        <Route path="/myPage" element={<MyPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/myWriting" element={<MyWriting />} />
        <Route path="/Chatting" element={<Chatting />} />


        {/* 카카오 로그인 테스트 */}
        <Route path="/login2" element={<Login2 />} />
          <Route path="/oauth/kakao/callback" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;