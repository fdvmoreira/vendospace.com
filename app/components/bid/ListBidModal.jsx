const ListBidsModal = ({bids}) =>{

  return (
    <div class="modal fade" id="listBidsModal" tabIndex="-1" role="dialog" aria-labelledby="BidsListModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              {
                bids?.map(bid =>{
                  return (
                    <li key={bid?._id}>
                      <ul className="list-unstyled d-flex">
                        <li>Auction: {bid?.auction}</li>
                        <li>Bidder: {bid?.bidder}</li>
                        <li>BID: {bid?.price}</li>
                      </ul>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBidsModal;