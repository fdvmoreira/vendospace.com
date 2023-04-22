function ItemCard({ item }) {
  return (
    <div className="card m-3">
      <img src={item.imagesURL[0]} className="card-img-top" alt={item.type} />
      <div className="card-body">
        <h5 className="card-title">{item.type}</h5>
        <p className="card-text">{item.address}</p>
        <p className="card-text">
          Dimensions: {item.dimension.width} {item.dimension.unit} x{" "}
          {item.dimension.height} {item.dimension.unit}
        </p>
        <p className="card-text">
          Location: {item.location.latitude}, {item.location.longitude}
        </p>
      </div>
    </div>
  );
}

function ItemList({ items }) {
  return (
    <div className="container">
      <div className="row">
        {items.map((item, index) => (
          <div className="col-md-4" key={index}>
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;