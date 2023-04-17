import Link from "next/link";

const ActionMenu = ()=> {

  return (
    <div className="dropdown">
      <button className="btn btn-primary dropdown-toggle" 
        type="button" 
        id="dropdownMenuButton" 
        data-bs-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false"
        >
        create new
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link className="dropdown-item" href="/adspaces/new">Ad space</Link>
        <Link className="dropdown-item" href="/listings/new">Listing</Link>
        <Link className="dropdown-item" href="/auctions/new">Auction</Link>
      </div>
    </div>
  );
}

export default ActionMenu;