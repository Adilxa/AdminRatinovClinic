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

const usePrices = () => {
  const [prices, setPrices] = useState([]);
  const [detailPrice, setDetailPrice] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getPrices = useCallback(async () => {
    const arr = [];
    const data = await getDocs(collection(db, "price"));
    data.forEach((doc) => {
      arr.push({ tid: doc.id, ...doc.data() });
    });
    setLoading(false);
    setPrices(arr);
  }, []);

  const getPrice = async (id) => {
    const docRef = doc(db, "price", id);
    const res = await getDoc(docRef);
    setLoading(false);
    if (res.exists()) {
      setDetailPrice(res.data());
    } else {
      alert("Have no blogs");
    }
  };

  const updatePrice = async (id, data) => {
    const ref = doc(db, "price", id);
    const res = await updateDoc(ref, data);
    return res;
  };

  const addPrice = async (data) => {
    const res = await addDoc(collection(db, "price"), {
      ...data,
    });
    return res;
  };
  return {
    isLoading,
    setLoading,
    getPrices,
    prices,
    getPrice,
    detailPrice,
    updatePrice,
    addPrice
  };
};

export default usePrices;
