import { useParams } from 'react-router-dom';
import { ConversationChannelPageStyle } from '../utils/styles';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context/AuthContext';
import { MessageType, MessageEventPayload } from '../utils/types';
import { getConversationMessages } from '../utils/api';
import { MessagePanel } from '../components/messages/MessagePanel';
import { SocketContext } from '../utils/context/SocketContext';
import { AppDispatch, RootState } from '../store';
import { fetchMessagesThunk } from '../store/conversationSlice';
import { useDispatch, useSelector } from 'react-redux';


export const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
    // getConversationMessages(conversationId)
    //   .then(({ data }) => {
    //     setMessages(data);
    //   })
    //   .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    socket.on('connected', () => console.log('Connected'));
    socket.on('onMessage', (payload: MessageEventPayload) => {
      console.log('Message Received');
      const { conversation, ...message } = payload;
      setMessages((prev) => [message, ...prev]);
    });
    return () => {
      socket.off('connected');
      socket.off('onMessage');
    };
  }, []);
  return (
    // <ConversationChannelPageStyle>Channel Page</ConversationChannelPageStyle>
    <ConversationChannelPageStyle>
      <MessagePanel messages={messages}></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
