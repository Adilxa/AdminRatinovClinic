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
  
  const useProfession = () => {
    const [proffession, setProffession] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [detailProfession , setDetailProfession] = useState([]);
  
    const getProfessions = useCallback(async () => {
      const arr = [];
      const data = await getDocs(collection(db, "proffesions"));
      data.forEach((doc) => {
        arr.push({ tid: doc.id, ...doc.data() });
      });
      setLoading(false);
      setProffession(arr);
    }, []);
  
    const getProfession = async (id) => {
      const docRef  =doc(db , "proffesions" , id);
      const res = await getDoc(docRef);
      setLoading(false);
      if(res.exists()) {
        setDetailProfession(res.data());
      }else{
        alert("Have no some Videos")
      }
    }
  
    const updateProfession = async (id , data) => {
      const ref = doc(db ,"proffesions", id);
      const res = await updateDoc(ref, data);
      return res;
    }
  
    const addProfession = async (data) => {
      const res = await addDoc(collection(db, "proffesions"), {
        ...data
      });
      return res;
    }
  
    return {
      proffession,
      isLoading,
      setLoading,
      getProfessions,
      getProfession,
      detailProfession,
      updateProfession,
      addProfession
    };
  };
  
  export default useProfession;
  