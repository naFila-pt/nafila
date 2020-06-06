import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";

import Loader from "../../components/Loader";

import Logo from "../../assets/icons/naFilaOnlyLine.svg";
import FooterRight from "../../assets/icons/footerNaFilaLink.svg";
import FooterLeft from "../../assets/icons/footerTech4covidAndPartners.svg";
import { firestore, analytics } from "../../firebase";

import QRCode from "qrcode.react";

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
        analytics.setUserProperties({
          shop: queueData.owner_id,
          retailerGroup: queueData.retailerGroup,
          shoppingCentre: queueData.shoppingCentre
        });
        setQueue(queueData);
        setLoading(false);
      });
  }, [queueId]);

  if (loading) return <Loader />;

  return (
    <S.PosterContainer>
      <Typography className="queue-name">{queue.name}</Typography>
      <Typography className="date">{getDate()}</Typography>
      <Typography className="time-in-queue">
        {t("admin#queuePoster_mark_your_time_in_queue")}
      </Typography>
      <p
        className="send-sms-queue"
        dangerouslySetInnerHTML={{
          __html: t("admin#send_free_sms_queue", { queueCode: queueId })
        }}
      ></p>
      <div className="logo-container">
        <S.QRCodeWrapper>
          <QRCode
            value={`${window.location.hostname}/tirar-senha/${queueId}`}
            size="85"
          />
        </S.QRCodeWrapper>
        <img src={Logo} width="100%" height="100%" alt="logo" />
        <div className="queue-info">
          <div className="queue-code-label">
            {t("admin#queuePoster_queueCode")}
          </div>
          <div className="queue-code-value">{queueId}</div>
        </div>
      </div>
      <div className="footer">
        <img src={FooterLeft} height="100%" alt="partners" />
        <img src={FooterRight} height="100%" alt="naFila" />
      </div>
    </S.PosterContainer>
  );
}

export default QueuePoster;
