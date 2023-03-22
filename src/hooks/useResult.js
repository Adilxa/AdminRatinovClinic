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

const useResult = () => {
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [detailRes, setDetailRes] = useState([]);

  const getResult = useCallback(async () => {
    const arr = [];
    const data = await getDocs(collection(db, "result"));
    data.forEach((doc) => {
      arr.push({ tid: doc.id, ...doc.data() });
    });
    setLoading(false);
    setResult(arr);
  }, []);

  const addResult = async (data) => {
    const res = await addDoc(collection(db, "result"), {
      ...data,
    });
    return res;
  };

  const getDetail = async (id) => {
    const docRef = doc(db, "result", id);
    const res = await getDoc(docRef);
    setLoading(false);
    if (res.exists()) {
      setDetailRes(res.data());
    } else {
      alert("Have no some Results");
    }
  };

  const updateResult = async (id, data) => {
    const ref = doc(db, "result", id);
    const res = await updateDoc(ref, data);
    return res;
  };

  return {
    result,
    isLoading,
    getResult,
    setLoading,
    addResult,
    getDetail,
    detailRes,
    updateResult
  };
};

export default useResult;
