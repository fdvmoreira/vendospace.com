import RestrictedArea from "@/components/RestrictedArea";
import History from "@/components/profile/history/History";
import Message from "@/components/profile/message/Message";
import Profile from "@/components/profile/profile/Profile";
import Setting from "@/components/profile/setting/Setting";
import { useAuth } from "@/context/authContext";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

export default function MyAccount(props) {
  let [auth] = useAuth();

  if (!auth?.isAuthenticated) return <RestrictedArea />;

  return (
    <div className='container'>
      <div className='d-flex align-items-center flex-column'>
        <nav className='nav nav-pills me-3' id='v-pills-tab' role='tablist'>
          <a
            className='nav-item nav-link btn active'
            id='v-pills-profile-tab'
            data-bs-toggle='pill'
            data-bs-target='#v-pills-profile'
            type='a'
            role='tab'
            aria-controls='v-pills-profile'
            aria-selected='true'>
            Profile
          </a>
          <a
            className='nav-item nav-link btn'
            id='v-pills-messages-tab'
            data-bs-toggle='pill'
            data-bs-target='#v-pills-messages'
            type='a'
            role='tab'
            aria-controls='v-pills-messages'
            aria-selected='false'>
            Messages
          </a>
          <a
            className='nav-item nav-link btn'
            id='v-pills-settings-tab'
            data-bs-toggle='pill'
            data-bs-target='#v-pills-settings'
            type='a'
            role='tab'
            aria-controls='v-pills-settings'
            aria-selected='false'>
            Settings
          </a>
          <a
            className='nav-item nav-link btn'
            id='v-pills-history-tab'
            data-bs-toggle='pill'
            data-bs-target='#v-pills-history'
            type='a'
            role='tab'
            aria-controls='v-pills-history'
            aria-selected='false'>
            Account history
          </a>
        </nav>
        <div className='tab-content' id='v-pills-tabContent'>
          <div
            className='tab-pane show active'
            id='v-pills-profile'
            role='tabpanel'
            aria-labelledby='v-pills-profile-tab'>
            <Suspense fallback={<p>Loading Profile ...</p>}>
              <Profile />
            </Suspense>
          </div>
          <div
            className='tab-pane fade'
            id='v-pills-messages'
            role='tabpanel'
            aria-labelledby='v-pills-messages-tab'>
            <Suspense fallback={<p>Loading messages ...</p>}>
              <Message />
            </Suspense>
          </div>
          <div
            className='tab-pane fade'
            id='v-pills-settings'
            role='tabpanel'
            aria-labelledby='v-pills-settings-tab'>
            <Suspense fallback={<p>Loading Settings ...</p>}>
              <Setting />
            </Suspense>
          </div>
          <div
            className='tab-pane fade'
            id='v-pills-history'
            role='tabpanel'
            aria-labelledby='v-pills-history-tab'>
            <Suspense fallback={<p>Loading History ...</p>}>
              <History />
            </Suspense>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
