import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase/firebase";

const useYouTube = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [detailVideo , setDetailVideo] = useState([]);

  const getVideos = useCallback(async () => {
    const arr = [];
    const data = await getDocs(collection(db, "youtubeContent"));
    data.forEach((doc) => {
      arr.push({ tid: doc.id, ...doc.data() });
    });
    setLoading(false);
    setVideos(arr);
  }, []);

  const getVideo = async (id) => {
    const docRef  =doc(db , "youtubeContent" , id);
    const res = await getDoc(docRef);
    setLoading(false);
    if(res.exists()) {
      setDetailVideo(res.data());
    }else{
      alert("Have no some Videos")
    }
  }

  const updateVideo = async (id , data) => {
    const ref = doc(db ,"youtubeContent", id);
    const res = await updateDoc(ref, data);
    return res;
  }

  const addVideo = async (data) => {
    const res = await addDoc(collection(db, "youtubeContent"), {
      ...data
    });
    return res;
  }

  return {
    videos,
    isLoading,
    setLoading,
    getVideos,
    getVideo,
    detailVideo,
    updateVideo,
    addVideo
  };
};

export default useYouTube;
