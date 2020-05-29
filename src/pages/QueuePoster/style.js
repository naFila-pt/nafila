import styled from "styled-components";

export const PosterContainer = styled.div`
  text-align: center;
  padding: 5vh 1vh;
  color: black;

  .queue-name {
    font-size: 36px;
    line-height: 29px;
    font-weight: bold;
  }
  .date {
    margin-top: 20px;
    font-size: 28px;
    line-height: 29px;
    font-weight: bold;
  }
  .time-in-queue {
    margin-top: 34px;
    font-size: 46px;
    line-height: 55px;
    text-transform: uppercase;
    font-weight: 800;
    padding: 0 6rem;
  }
  .send-sms-queue {
    margin-top: 34px;
    font-size: 18px;
    line-height: 22px;
  }

  .logo-container {
    position: relative;
    height: 358px;
    margin-top: 57px;
  }

  .queue-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  .queue-code-label {
    font-size: 26px;
    line-height: 27px;
    font-weight: 900;
    margin: 0;
  }

  .queue-code-value {
    font-size: 55px;
    line-height: 27px;
    font-weight: 900;
    margin-top: 40px;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 40px;
    height: 50px;
    box-sizing: content-box;
    justify-content: space-between;
  }
  .larger {
    font-size: 24px;
    line-height: 29px;
    font-weight: 900;
  }
`;
