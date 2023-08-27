import { FooterConversation } from './FooterConversation';
import { HeaderConversation } from './HeaderConversation';
import { MainConversation } from './MainConversation';

export const Conversation = () => {
    return (
        <>
            {/* SPACE  */}
            <div className='absolute w-full h-full left-0 top-0 bg-conversation'></div>

            {/* HEADER CONVERSATION */}

            <HeaderConversation />

            {/* MAIN CONVERSATION */}

            <MainConversation />

            {/* FOOTER CONVERSATION */}

            <FooterConversation />
        </>
    );
};
