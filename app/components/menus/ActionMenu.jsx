import Link from "next/link";

const ActionMenu = ()=> {

  return (
    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        create new
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link class="dropdown-item" href="/adspaces/new">Ad space</Link>
        <Link class="dropdown-item" href="/listings/new">Listing</Link>
        <Link class="dropdown-item" href="/auctions/new">Auction</Link>
      </div>
    </div>
  );
}

export default ActionMenu;