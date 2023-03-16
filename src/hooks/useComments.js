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

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [detailComment, setDetailComment] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getComments = useCallback(async () => {
    const arr = [];
    const data = await getDocs(collection(db, "comments"));
    data.forEach((doc) => {
      arr.push({ tid: doc.id, ...doc.data() });
    });
    setLoading(false);
    setComments(arr);
  }, []);

  const getComment = async (id) => {
    const docRef = doc(db, "comments", id);
    const res = await getDoc(docRef);
    setLoading(false);
    if (res.exists()) {
      setDetailComment(res.data());
    } else {
      alert("Have no comments");
    }
  };

  const updateComment = async (id, data) => {
    const ref = doc(db, "comments", id);
    const res = await updateDoc(ref, data);
    return res;
  };

  const addComment = async (data) => {
    const res = await addDoc(collection(db, "comments"), {
      ...data,
    });
    return res;
  };

  return {
    isLoading,
    getComments,
    comments,
    getComment,
    detailComment,
    setLoading,
    updateComment,
    addComment,
  };
};

export default useComments;
