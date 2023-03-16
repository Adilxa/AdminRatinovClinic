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

const useBLogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [detailBlog, setDetailBlog] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getBlogs = useCallback(async () => {
    const arr = [];
    const data = await getDocs(collection(db, "blog"));
    data.forEach((doc) => {
      arr.push({ tid: doc.id, ...doc.data() });
    });
    setLoading(false);
    setBlogs(arr);
  }, []);

  const getBlog = async (id) => {
    const docRef = doc(db, "blog", id);
    const res = await getDoc(docRef);
    setLoading(false);
    if (res.exists()) {
      setDetailBlog(res.data());
    } else {
      alert("Have no blogs");
    }
  };

  const updateBlog = async (id, data) => {
    const ref = doc(db, "blog", id);
    const res = await updateDoc(ref, data);
    return res;
  };

  const addBlog = async (data) => {
    const res = await addDoc(collection(db , "blog"), {
      ...data,
    });
    return res;
  }

  return {
    isLoading,
    getBlogs,
    blogs,
    getBlog,
    detailBlog,
    setLoading,
    updateBlog,
    addBlog
  };
};

export default useBLogs;
