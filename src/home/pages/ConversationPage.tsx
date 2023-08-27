import {
    FooterConversation,
    HeaderConversation,
    MainConversation
} from '@/components/home/conversation';
import { useAuthStore, useGetConversationById } from '@/hooks';
import { Conversation, User } from '@/interfaces';
import { Fragment } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export const ConversationPage = () => {
    const { conversation = '' } = useParams();
    const { user } = useAuthStore();

    const { data, isLoading, isError } = useGetConversationById(conversation);

    const otherUser = data?.data.conversation.participants.find(
        (participant) => participant._id !== user?._id
    );
    if (isError) {
        return <Navigate to={'/conversations'} />;
    }

    return (
        <Fragment>
            {isLoading ? (
                <Fragment />
            ) : (
                <Fragment>
                    {/* SPACE  */}
                    {/* <div className='absolute w-full h-full left-0 top-0 bg-conversation'></div> */}

                    {/* HEADER CONVERSATION */}

                    <HeaderConversation otherUser={otherUser || ({} as User)} />

                    {/* MAIN CONVERSATION */}

                    <MainConversation
                        messages={data?.data.conversation.messages || []}
                        otherUser={otherUser || ({} as User)}
                    />

                    {/* FOOTER CONVERSATION */}

                    <FooterConversation
                        conversation={
                            data?.data.conversation || ({} as Conversation)
                        }
                        otherUser={otherUser!}
                    />
                </Fragment>
            )}
        </Fragment>
    );
};
