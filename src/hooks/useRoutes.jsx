import { Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import AddOrEditTourPage from "../pages/ToursPage/AddOrEditTourPage";
import AddOrEditTransportPage from "../pages/ToursPage/AddOrEditTransportPage";
import TourDetailPage from "../pages/ToursPage/TourDetailPage";
import ToursPage from "../pages/ToursPage/ToursPage";
import TransportDetailPage from "../pages/ToursPage/TransportDetailPage";
import BlogPage from "../pages/blogsPage/BlogPage";
import BlogDetail from "../pages/blogsPage/BlogDetail";
import AddBlog from "../pages/blogsPage/AddBlog";
import PricePage from "../pages/PricePage/PricePage";
import PriceDetail from "../pages/PricePage/PriceDetail";
import AddPrice from "../pages/PricePage/AddPrice";
import CommentsPage from "../pages/Comments/CommentsPage";
import CommentsDetail from "../pages/Comments/CommentsDetail";
import AddComment from "../pages/Comments/AddComment";
import YoutubePage from "../pages/YoutubePage/YoutubePage";
import YoutubeDetail from "../pages/YoutubePage/YoutubeDetail";
import AddVideo from "../pages/YoutubePage/AddVideo";
import ProfessionPage from "../pages/ProfessionPage/ProfessionPage";

const useRoutes = (isAuth) => {
  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Grid container spacing={5}>
      <Grid item lg={2.5} md={2}>
        <SideBar />
      </Grid>
      <Grid item lg={9.5} md={10}>
        <Routes>
          <Route path="/" element={<ToursPage />} />
          <Route path="/tour/create" element={<AddOrEditTourPage />} />
          <Route path="/tour/:id" element={<TourDetailPage />} />
          <Route path="/transport/:id" element={<TransportDetailPage />} />
          <Route
            path="/transport/create/:tourId"
            element={<AddOrEditTransportPage />}
          />
          <Route
            path="/transport/edit/:tourId"
            element={<AddOrEditTransportPage />}
          />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/blogs/create" element={<AddBlog />} />
          <Route path="/price" element={<PricePage />} />
          <Route path="/price/:id" element={<PriceDetail />} />
          <Route path="/price/create" element={<AddPrice />} />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/comments/:id" element={<CommentsDetail />} />
          <Route path="/comments/create" element={<AddComment />} />
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/youtube/:id" element={<YoutubeDetail />} />
          <Route path="/youtube/create" element={<AddVideo />} />
          <Route path="/profession" element={<ProfessionPage />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default useRoutes;
