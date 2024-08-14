import {Link} from 'react-router-dom'
import './index.css'

const Jobitems = props => {
  const {each} = props
  return (
    <Link className="jobitembg1" to={`/jobs/${each.id}`}>
      <img alt="company logo" src={each.company_logo_url} />

      <h1>{each.title}</h1>
      <p>{each.rating}</p>
      <p>{each.location}</p>
      <p>{each.employment_type}</p>
      <p>{each.package_per_annum}</p>
      <h1>Description</h1>
      <p>{each.job_description}</p>
    </Link>
  )
}
export default Jobitems
