import { useLocation, useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import { IoHome, IoHomeOutline, IoSearch, IoSearchOutline,
    IoPerson, IoPersonOutline, IoNotifications, 
    IoNotificationsOutline } from "react-icons/io5";
import { HomePage } from "../pages/Home";
import { SearchPage } from "../pages/Search";
import { NotificationsPage } from "../pages/Notifications";
import { ProfilePage } from "../pages/Profile";


export const Tabs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <main className="h-[100vh] overflow-y-scroll pt-4 relative bg-white dark:bg-zinc-900 text-white">
            <Routes>
                <Route index={true} path="/home" element={<HomePage/>} />
                <Route path="/search/*" element={<SearchPage/>} />
                <Route path="/notifications" element={<NotificationsPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
            </Routes>

            <TabLayout>
                <TabButton onClick={()=>navigate('/main/home')}>
                    {location.pathname === '/main/home'? <IoHome/>:<IoHomeOutline/>}
                </TabButton>
                <TabButton onClick={()=>navigate('/main/search')}>
                    {location.pathname === '/main/search'? <IoSearch/>:<IoSearchOutline/>}
                </TabButton>
                <TabButton onClick={()=>navigate('/main/notifications')}>
                    {location.pathname === '/main/notifications'? <IoNotifications/>:<IoNotificationsOutline/>}
                </TabButton>
                <TabButton onClick={()=>navigate('/main/profile')}>
                    {location.pathname === '/main/profile' ? <IoPerson/> : <IoPersonOutline/>}
                </TabButton>
            </TabLayout>
        </main>
    )
}

const TabLayout = (props) =>{
    return(
        <div className="h-12 sticky bottom-0 justify-between flex w-full bg-slate-300 dark:bg-zinc-900">
            {props.children}
        </div>
    )
}
const TabButton = (props) => {
    return(
    <span onClick={props.onClick} className="h-full text-xl items-center flex justify-center w-1/6 rounded-2xl bg-inherit text-sky-500">
        {props.children}
    </span>
    )
}