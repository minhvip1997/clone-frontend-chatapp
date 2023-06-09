import { useParams } from 'react-router-dom';
import { ConversationChannelPageStyle } from '../utils/styles';
import { useContext } from 'react';
import { AuthContext } from '../utils/context/AuthContext';

export const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);
  return (
    // <ConversationChannelPageStyle>Channel Page</ConversationChannelPageStyle>
    <ConversationChannelPageStyle>
      {user && user.email}
    </ConversationChannelPageStyle>
  );
};
