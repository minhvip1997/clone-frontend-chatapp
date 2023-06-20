import { useParams } from 'react-router-dom';
import { ConversationChannelPageStyle } from '../utils/styles';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context/AuthContext';
import { MessageType } from '../utils/types';
import { getConversationMessages } from '../utils/api';
import { MessagePanel } from '../components/messages/MessagePanel';


export const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    const conversationId = parseInt(id!);
    getConversationMessages(conversationId)
      .then(({ data }) => {
        console.log(data);
        setMessages(data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    // <ConversationChannelPageStyle>Channel Page</ConversationChannelPageStyle>
    <ConversationChannelPageStyle>
      <MessagePanel messages={messages}></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
