import { Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import FormPageContainer from "../../components/containers/FormPageContainer";
import PageContainer from "../../components/containers/PageContainer";
import Preloader from "../../components/preloader/Preloader";
import useBLogs from "../../hooks/useBlogs";
import Blog from "./Blog";

const BlogPage = () => {
  const { getBlogs, blogs, isLoading, updateBlog, detailBlog } = useBLogs();
  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  const renderBlogs = useMemo(
    () => blogs.map((el) => <Blog key={el.tid} {...el} />),
    [blogs, updateBlog, detailBlog]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Блоги"
      pathToAdd="/blogs/create"
      btnText={"+ Добавить Блог"}
    >
      <Grid>{renderBlogs}</Grid>
    </PageContainer>
  );
};

export default BlogPage;
