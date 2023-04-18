import Link from "next/link"

const HistoryItemCard = ({href, title, count}) => {
  
  return (
    <div className="card bg-light">
      <Link className="card-body"  href={href}>
          <div className="text-center">
            <h1>{count}</h1>
            <h5>{title}</h5>
          </div>
        </Link>
    </div>
    
  )
}

export default HistoryItemCard