import React, { useState, useEffect } from "react";
// import {  }

// import Layout from "../Layout";
import Loader from "../../../components/Loader";
import { auth, firestore } from "../../../firebase";

import Start from "./Start";

function Queue() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [hasQueue] = useState(false);

  useEffect(() => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then(response => {
        setUser(response.data());
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (hasQueue) return <div>"Manage Queue"</div>;

  return <Start user={user} />;
}

export default Queue;
