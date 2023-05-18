import { useEffect, useRef, useState } from "react";
import {
  ContainerHome,
  ContainerChat,
  TextTitle,
  InputName,
  ContainerChatRealTime,
  InputResp,
  ListConversation,
  Conversation,
  ContainerConversation,
  ButtonSendMessage,
  ContainerResp,
  ContainerInput,
  ButtonJoinRoom,
} from "./styles";
import io, { Socket } from "socket.io-client";
import { randomUUID } from "crypto";
import * as uuid from "uuid";

const Title = "Chat in Real Time";

interface MessageProps {
  id?: string;
  name: string;
  textMessage: string;
}

interface PayloadProps {
  id?: string;
  author: string;
  message: string;
  time?: string;
  room?: string;
}

export default function HomePage() {
  const socketIORef = useRef<Socket>();
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");

  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    socketIORef.current = io("http://localhost:3000");
    socketIORef.current.on("connect", () => {
      // socketIORef.current?.emit("msgToServer", 1);
    });

    // socketIORef.current.on("received-message", (data) => {
    //   setMessages([...messages, data]);
    // });

    // socketIORef.current.on("message-room", (data) => {
    //   console.log("Data Broadcast", data);
    // });

    function receivedMessage(newmessage: PayloadProps) {
      const messageData: PayloadProps = {
        id: uuid.v4(),
        author: newmessage.author,
        message: newmessage.message,
        time: dateFormat(),
        room: "default",
      };

      setMessages([...messages, messageData]);
    }

    socketIORef.current.on("msgToClient", (message: PayloadProps) => {
      receivedMessage(message);
    });
  }, [socketIORef.current, messages, author, message]);

  const joinRoom = () => {
    if (author !== "" && room !== "") {
      const joined = {
        id: uuid.v4(),
        author,
        room,
      };

      socketIORef.current?.emit("join-room", joined);
      setAuthor(joined.author);
      setRoom(joined.room);
    }
  };

  function validateInput() {
    return author.length > 0 && message.length > 0;
  }

  const handleSendMessage = async () => {
    if (validateInput()) {
      const messageData: PayloadProps = {
        id: uuid.v4(),
        author,
        message,
        time: dateFormat(),
        room: "default",
      };

      socketIORef.current?.emit("msgToServer", messageData);
      setMessage("");
    }
  };

  function consoleLog(message: any) {
    console.log(message);
  }
  return (
    <ContainerHome>
      <ContainerChat>
        <TextTitle>{Title}</TextTitle>
        <ContainerInput>
          <InputName
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter name..."
          />
          {/* <InputName
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter room..."
          /> */}
          <ButtonJoinRoom type="button" onClick={joinRoom}>
            Join
          </ButtonJoinRoom>
        </ContainerInput>
        <ContainerChatRealTime>
          <ListConversation>
            {messages.map((message) => {
              return (
                <Conversation
                  key={message.id}
                  status={message.author === author ? "titular" : undefined}
                >
                  <ContainerConversation>
                    <span>{message.author}</span>
                    <p>{message.message}</p>
                    <p>{message.time}</p>
                  </ContainerConversation>
                </Conversation>
              );
            })}
          </ListConversation>
        </ContainerChatRealTime>
        <ContainerResp>
          <InputResp
            value={message}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter response..."
          />
          <ButtonSendMessage type="button" onClick={handleSendMessage}>
            Send
          </ButtonSendMessage>
        </ContainerResp>
      </ContainerChat>
    </ContainerHome>
  );
}

const dateFormat = () => {
  var data = new Date();

  var dia = data.getDate(); // 1-31
  var dia_sem = data.getDay(); // 0-6 (zero=domingo)
  var mes = data.getMonth(); // 0-11 (zero=janeiro)
  var ano2 = data.getFullYear(); // 2 dígitos
  var ano4 = data.getFullYear(); // 4 dígitos
  var hora = data.getHours(); // 0-23
  var min = data.getMinutes(); // 0-59
  var seg = data.getSeconds(); // 0-59
  var mseg = data.getMilliseconds(); // 0-999
  var tz = data.getTimezoneOffset(); // em minutos

  // Formata a data e a hora (note o mês + 1)
  var str_data = dia + "/" + (mes + 1) + "/" + ano4;
  var str_hora = hora + ":" + min + ":" + seg;
  return `${str_data} as ${str_hora}`;
};

{
  /* <Conversation status="secondary">
                <ContainerConversation>
                  <span>Jander</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ratione dolores nostrum quo minus cumque aperiam repellendus
                    alias facere vero saepe, in quam beatae voluptatem
                    temporibus totam, assumenda magnam fugit laborum.
                  </p>
                </ContainerConversation>
              </Conversation> */
}
