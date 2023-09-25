import Link from "next/link";

const RestrictedArea =() =>{
  return (
    <div className="container d-flex flex-column align-items-center">
      <p className="lead">It appears that you have attempted to access a <em>restricted</em> area.</p>
      
      <Link href={'/login'} className="btn btn-lg btn-outline-primary">Authenticate</Link>
    </div>
  )
}

export default RestrictedArea;
