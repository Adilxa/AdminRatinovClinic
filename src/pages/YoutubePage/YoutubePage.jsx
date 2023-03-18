import React, { useEffect, useMemo } from "react";
import Preloader from "../../components/preloader/Preloader";
import useYouTube from "../../hooks/useYouTube";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import YoutubeTable from "../../components/tables/YoutubeTable";
import { TableRow, TableCell } from "@mui/material";

const YoutubePage = () => {
  const { isLoading, getVideos, videos } = useYouTube();
  useEffect(() => {
    getVideos();
  }, [getVideos]);

  const renderVideo = useMemo(
    () =>
      videos.map((el, index) => (
        <YoutubeTable key={`${el.tid}_${index}`} {...el} />
      )),
    [videos]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Видео"
      pathToAdd={"/youtube/create"}
      btnText="+ Добавить видео"
    >
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell />
          </TableRow>
        }
        Body={renderVideo}
      ></TableContainer>
    </PageContainer>
  );
};

export default YoutubePage;
