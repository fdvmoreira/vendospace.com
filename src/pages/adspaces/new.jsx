import RestrictedArea from "../../components/RestrictedArea";
import SpaceManager from "../../components/space/SpaceManager";
import { useAuth } from "../../context/authContext";

const SpaceCreate = () => {

  let [auth, _] = useAuth();
  
  if(!auth?.isAuthenticated) return <RestrictedArea/>

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center">
        <p className="lead">Create new ad space</p>
        <hr className=""/>
        <SpaceManager/>
      </div>
    </div>
  );
}

export default SpaceCreate;