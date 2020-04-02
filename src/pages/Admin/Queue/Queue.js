import React, { useState, useEffect } from "react";
// import {  }

// import Layout from "../../components/AdminLayout";
import Loader from "../../../components/Loader";
import { auth, firestore } from "../../../firebase";

import Start from "./Start";
import Manage from "./Manage";

function Queue({ openSnackbar }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [queue, setQueue] = useState();

  useEffect(() => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then(response => {
        const user = response.data();

        setUser(user);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user) setQueue(user.queues[0]);
  }, [user]);

  if (loading) return <Loader />;
  if (queue) return <Manage queueId={queue} openSnackbar={openSnackbar} />;

  return <Start user={user} setQueue={setQueue} openSnackbar={openSnackbar} />;
}

export default Queue;
