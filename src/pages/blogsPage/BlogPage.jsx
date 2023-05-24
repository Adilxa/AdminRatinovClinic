import React, { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import Preloader from "../../components/preloader/Preloader";
import useBLogs from "../../hooks/useBlogs";
import { TableRow, TableCell } from "@mui/material";
import BlogsTable from "../../components/tables/BlogsTable";
import TableContainer from "../../components/TableContainer/TableContainer";

const BlogPage = () => {
  const { getBlogs, blogs, isLoading, updateBlog } = useBLogs();
  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  const renderBlogs = useMemo(
    () => blogs.map((el) => <BlogsTable key={el.tid} {...el} />),
    [blogs, updateBlog]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Блоги"
      pathToAdd={"/blogs/create"}
      btnText="+ Добавить Блог"
    >
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>Тип</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell />
          </TableRow>
        }
        Body={renderBlogs}
      ></TableContainer>
    </PageContainer>
  );
};

export default BlogPage;
