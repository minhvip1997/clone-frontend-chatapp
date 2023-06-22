import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../components/conversations/ConversationSidebar';
import { getConversations } from '../utils/api';
import { Page } from '../utils/styles';
import { ConversationType } from '../utils/types';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { fetchConversationsThunk } from '../store/conversationSlice';

export const ConversationPage = () => {
  const { id } = useParams();
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // getConversations()
    //   .then(({ data }) => {
    //     setConversations(data);
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));
    dispatch(fetchConversationsThunk());
  }, []);
  // console.log(id);

  return (
    <Page>
      <ConversationSidebar conversations={conversations} />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
};
