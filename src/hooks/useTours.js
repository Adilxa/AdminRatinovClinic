import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase/firebase";

const useTours = () => {
  const [error, setError] = useState("");
  const [tours, setTours] = useState([]);
  const [tourDetail, setTourDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getDoctor = useCallback(async () => {
    const arr = [];
    const data = await getDocs(collection(db, "doctors"));
    data.forEach((doc) => {
      arr.push({ tid: doc.id, ...doc.data() });
    });
    setTours(arr);
    setLoading(false);
  }, []);

  const addDoctor = async (data) => {
    const res = await addDoc(collection(db, "doctors"), {
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
    });
    return res;
  };

  const getDetailDoctor = async (id) => {
    const docRef = doc(db, "doctors", id);
    const res = await getDoc(docRef);
    setLoading(false);
    if (res.exists()) {
      setTourDetail(res.data());
    } else {
      setError("Данный тур не найден!");
    }
  };

  const updateDoctor = async (id, data) => {
    const ref = doc(db, "doctors", id);
    const res = await updateDoc(ref, data);
    return res;
  };

  return {
    isLoading,
    tours,
    getDoctor,
    addDoctor,
    tourDetail,
    getDetailDoctor,
    error,
    updateDoctor,
    setLoading,
  };
};

export default useTours;
