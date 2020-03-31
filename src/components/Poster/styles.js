import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 68px;
`;

export const Store = styled.div`
  margin-top: 15px;
  font-weight: 300;
  font-size: 25px;
`;

export const Queue = styled.div`
  margin-top: 8px;
  font-weight: 700;
  font-size: 50px;
`;

export const QueueDate = styled.div`
  margin-top: 8px;
  font: weight 400;
  font-size: 25px;
`;

export const CodeContainer = styled.div`
  display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	margin-top: 35px;
	width: 30rem;
	border: 3px solid #4c0788;
	border-radius: 60px;
	padding: 20px 0px;

  span {
    font-weight: 700;
	  font-size: 80px;
  }
`;

export const Options = styled.div`
  margin-top: 50px;
  font-size: 32px;
  font-weight: 400;

  span {
    font-weight: 700;
  }
`;

export const ImagesContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const Images = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;

  span {
    font-weight: 700;
    font-size: 20px;
  }
`;

export const Slogan = styled.div`
  margin-top: 25px;
  font-weight: 400;
  font-size: 25px;

  span {
    font-weight: 700;
  }
`;
