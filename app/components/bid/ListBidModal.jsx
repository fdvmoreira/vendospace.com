const ListBidsModal = ({bids}) =>{

  return (
    <div className="modal fade" id="listBidsModal" tabIndex="-1" role="dialog" aria-labelledby="BidsListModal" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBidsModal;