import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";

import Loader from "../../../components/Loader";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as Email } from "../../../assets/images/icon_email.svg";
import { ReactComponent as Mega } from "../../../assets/images/icon_nome.svg";
import { ReactComponent as Phone } from "../../../assets/images/icon_tlm.svg";
import { firestore } from "../../../firebase";

import * as S from "./style";

const getDate = () => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Intl.DateTimeFormat("pt-PT", options).format(new Date());
};
const icons = [<Email />, <Phone />, <Mega />];

function QueuePoster({
  match: {
    params: { queueId }
  }
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState();

  useEffect(() => {
    firestore
      .collection("queues")
      .doc(queueId)
      .get()
      .then(response => {
        setQueue(response.data());
        setLoading(false);
      });
  }, [queueId]);

  if (loading) return <Loader />;

  return (
    <S.PosterContainer>
      <Logo />

      <div className="store-name">{queue.name}</div>
      <Typography variant="h3">{t("admin#queuePoster_queueCode")}</Typography>

      <div className="queue-date">{getDate()}</div>
      <div className="queue-code">{queueId}</div>
      <div
        className="queue-enter-with"
        dangerouslySetInnerHTML={{
          __html: t("admin#queuePoster_enterQueueWith")
        }}
      />

      {icons.map((icon, index) => (
        <div className="queue-icon" key={index}>
          {icon}
        </div>
      ))}

      <div
        className="brand-slogan"
        dangerouslySetInnerHTML={{
          __html: t("admin#queuePoster_brandSlogan")
        }}
      />
    </S.PosterContainer>
  );
}

export default QueuePoster;
