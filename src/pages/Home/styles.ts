import styled from "styled-components";
import { desaturate } from "polished";

interface PropsConversation {
  status?: string | undefined;
}

export const ContainerHome = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #2c2c54;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerChat = styled.div`
  width: 50%;
  height: 95vh;
  padding: 16px;
  background-color: #474787;
  border-radius: 8px;
`;

export const TextTitle = styled.h1`
  text-align: center;
  margin-bottom: 12px;
`;

export const ContainerChatRealTime = styled.div`
  width: 100%;
  height: 70%;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #e6e6e6;
    border-radius: 88px;
  }

  ::-webkit-scrollbar-thumb {
    background: #7f7f7f;
    border-radius: 88px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #2c2c54;
  }
`;

export const ListConversation = styled.ul`
  color: #474787;
  list-style: none;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Conversation = styled.div<PropsConversation>`
  width: 100%;
  height: auto;
  margin-bottom: 5px;
  display: flex;
  justify-content: ${(props) =>
    props.status === "titular" ? "flex-start" : "flex-end"};
  align-items: center;
  gap: 10px;
`;

export const ContainerConversation = styled.div`
  width: 55%;
  height: auto;
  padding: 16px;
  /* background-color: rgba(209, 204, 192, 0.3); */
  background-color: beige;
  border-radius: 8px;
  p {
    font-style: italic;
    font-size: 16px;
    margin-top: 10px;
  }
  span {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

export const InputResp = styled.input`
  color: #474787;
  font-size: 28px;
  width: 80%;
  height: 70px;
  padding: 16px 12px;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ButtonSendMessage = styled.button`
  background-color: #2c2c54;
  color: #fff;
  width: 20%;
  border-radius: 8px;
  padding: 16px 12px;
  height: 70px;
  border: none;
  font-size: 28px;
  cursor: pointer;
  :hover {
    background-color: desaturate(0.8, "#474787");
  }
`;

export const ContainerInput = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const InputName = styled.input`
  color: #474787;
  font-size: 28px;
  width: 100%;
  padding: 16px 12px;
  background-color: #fff;
  border: none;
  border-radius: 8px;
`;

export const ButtonJoinRoom = styled.button`
  background-color: #2c2c54;
  color: #fff;
  border-radius: 8px;
  padding: 16px 12px;
  border: none;
  font-size: 28px;
  cursor: pointer;
  :hover {
    background-color: desaturate(0.8, "#474787");
  }
`;

export const ContainerResp = styled.div`
  width: 100%;
  background-color: #474787;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
