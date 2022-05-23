import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QuanLyDoanVien from './container/Admin/QuanLyDoanVien';
import Register from './container/Admin/Register';
import AllPostPage from './container/AllPostPage';
import HDKT from './container/AllPostPage/HDKT';
import DetailEvent from './container/DetailEvent';
import DetailPost from './container/DetailPost';
import Home from './container/Home';
import InfoPostPage from './container/InfoPostPage';
import UserInfo from './container/Users/UserInfo';
import ScrollToTop from './feature/ScrolltoTop';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import ROUTER from './router';
import './styles/App.css';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path={ROUTER.HOME} element={<Home />} />
        <Route path={ROUTER.BAI_DANG} element={<InfoPostPage />} />
        <Route path={ROUTER.DETAIL_POST} element={<DetailPost />} />
        <Route path={ROUTER.DETAIL_EVENT} element={<DetailEvent />} />
        <Route path={ROUTER.USER.INFO} element={<UserInfo />} />
        <Route path={ROUTER.ADMIN.CAP_TAI_KHOAN} element={<Register />} />
        <Route path={ROUTER.ADMIN.QUAN_LY_USER} element={<QuanLyDoanVien />} />
        <Route path={ROUTER.HOAT_DONG.ALL} element={<AllPostPage />} />
        <Route path={ROUTER.HOAT_DONG.DANG_DIEN_RA} element={<AllPostPage />} />
        <Route path={ROUTER.HOAT_DONG.DA_KET_THUC} element={<HDKT />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
