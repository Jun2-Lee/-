
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./pages/home";
import InitialInfo from "./pages/initial_info/initial_info";
import Signup from "./pages/signup";
import PostSharing from "./pages/post/post_sharing";
import SharingPage from "./pages/sharing";
import DutchPayPage from "./pages/dutchpay";
import GroupBuyingPage from "./pages/groupbuying";
import Login from "./pages/login/login";
import DetailSharing from "./pages/detail/detail_sharing";
import DetailPurchase from "./pages/grouppurchase/detail_purchase";
import PostDelivery from "./pages/post/post_delivery";
import PostgroupBuying from "./pages/post/post_groupBuying";
import EditProfile from "./pages/profile/profile_edit";
import MyWriting from "./pages/myWriting";
import MyPage from "./pages/mypage";
import Layout from "./components/Layout";

import Note from "./pages/note/note";


function App() {

  /*const fetchData = async () =>{
    const response = await axios.get('http://3.36.144.128:8080/naong-api');
  };

  useEffect(()=>{
    fetchData();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    await axios.post(SERVER_URL,{text, done});
    fetchData();
  };*/


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/initialInfo" element={<InitialInfo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/detailSharing" element={<DetailSharing />} />
          <Route path="/postSharing" element={<PostSharing />} />
          <Route path="/sharing" element={<SharingPage />} />
          <Route path="/dutchPay" element={<DutchPayPage />} />
          <Route path="/groupBuying" element={<GroupBuyingPage />} />
          <Route path="/detailPurchase" element={<DetailPurchase />} />
          <Route path="/postDelivery" element={<PostDelivery />} />
          <Route path="/postGroupBuying" element={<PostgroupBuying />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/myWriting" element={<MyWriting />} />

          <Route path="/note" element={<Note />} />

          <Route path="/myPage" element={<MyPage />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;