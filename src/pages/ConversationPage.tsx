import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../components/conversations/ConversationSidebar';
import { getConversations } from '../utils/api';
import { Page } from '../utils/styles';
import { ConversationType } from '../utils/types';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector  } from 'react-redux';
import { fetchConversationsThunk } from '../store/conversationSlice';


export const ConversationPage = () => {
  const { id } = useParams();
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  

  useEffect(() => {
    console.log(conversationsState.find((c) => c.id === 15));
    dispatch(fetchConversationsThunk());
  }, []);

  const conversationsState = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  // console.log(id);

  return (
    <Page>
      <ConversationSidebar conversations={conversations} />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
};
