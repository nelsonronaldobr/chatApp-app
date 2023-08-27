import { HeaderSidebar } from './HeaderSidebar';
import { MainSidebar } from './MainSidebar';

export const Sidebar = () => {
    return (
        <div className='border-r border-separator xl:max-w-[30%] xl:flex-[0_0_30%] lg:max-w-[40%] lg:flex-[0_0_40%] flex-[0_0_45%] max-w-[45%]'>
            {/* HEADER SIDEBAR */}

            <HeaderSidebar />

            {/* MAIN SIDEBAR */}

            <MainSidebar />
        </div>
    );
};
