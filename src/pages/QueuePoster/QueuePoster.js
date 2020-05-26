import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";

import Loader from "../../components/Loader";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { ReactComponent as Group } from "../../assets/images/group.svg";
import { firestore, analytics } from "../../firebase";

import TitleComponent from "../../components/TitleComponent";

import * as S from "./style";

const getDate = () => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Intl.DateTimeFormat("pt-PT", options).format(new Date());
};

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
        let queueData = response.data();
        if (!!queueData.accountGroup) {
          analytics.setUserProperties({ accountGroup: queueData.accountGroup });
        }
        setQueue(queueData);
        setLoading(false);
      });
  }, [queueId]);

  if (loading) return <Loader />;

  return (
    <S.PosterContainer>
      <div
        className="brand-slogan"
        dangerouslySetInnerHTML={{
          __html: t("admin#queuePoster_brandSlogan")
        }}
      />

      <TitleComponent title="Poster de fila" pageId="queue_poster" />
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

      <div className="queue-icon">
        <div className="sms-explainer">
          Envie <span>nafila {queueId}</span>
          <br />
          para o <span>4902</span>
        </div>
        <Group />
      </div>
    </S.PosterContainer>
  );
}

export default QueuePoster;
