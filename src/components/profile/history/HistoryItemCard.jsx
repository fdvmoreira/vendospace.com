import Link from "next/link"

const HistoryItemCard = ({href, title, count}) => {
  
  return (
    <div className="container card bg-light">
      <Link className="card-body"  href={href}>
          <div className="text-center">
            <h1 className="text-nowrap ">{count}</h1>
            <h5 className="text-nowrap">{title}</h5>
          </div>
        </Link>
    </div>
    
  )
}

export default HistoryItemCard