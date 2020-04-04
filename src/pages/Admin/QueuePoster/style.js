import styled from "styled-components";

export const PosterContainer = styled.div`
  text-align: center;
  padding: 7vh 0;

  .store-name {
    margin: 20px 0 10px;
    color: #111;
    font-size: 5vw;
  }

  h3 {
    font-size: 6vw;
  }

  .queue-date {
    color: #111;
    font-size: 5vw;
    margin: 20px 0;
  }

  .queue-code {
    color: #111;
    font-size: 64px;
    border: 3px #4c0788 solid;
    border-radius: 100px;
    font-weight: 900;
    margin: 0 30px 20px;
    padding: 15px 0;
  }

  .queue-enter-with {
    font-size: 22px;
    margin: 0 0 20px;
  }

  .queue-icon {
    display: inline-block;
    width: 33%;
  }

  .brand-slogan {
    color: #111;
    font-size: 24px;

    b {
      color: #4c0788;
    }
  }
`;
