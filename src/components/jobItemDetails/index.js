import {Component} from 'react'
// import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
// import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
// import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getProductData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const profiledata = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        productData: profiledata,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProductDetailsView = () => {
    const {productData} = this.state
    const {job_details, similar_jobs} = productData
    return (
      <div className="itembg1">
        <img
          src={job_details.company_logo_url}
          alt="job details company logo"
        />
        <h1>{job_details.title}</h1>
        <p>{job_details.rating}</p>
        <p>{job_details.location}</p>
        <p>{job_details.employment_type}</p>
        <p>{job_details.package_per_annum}</p>
        <div>
          <h1>Description</h1>
          <a target="_blank" href={job_details.company_website_url}>
            Visit
          </a>
        </div>
        <div>
          <p>{job_details.job_description}</p>
        </div>
        <h1>skills</h1>
        <ul className="unorderlistbg1">
          {job_details.skills.map(each => {
            console.log(each)
            return (
              <li key={each.name}>
                <img alt={each.name} src={each.image_url} />
                <p>{each.name}</p>
              </li>
            )
          })}
        </ul>
        <div>
          <h1>Life at Company</h1>
          <p>{job_details.life_at_company.description}</p>
          <img alt="life at company" src={job_details.life_at_company.image_url} />
        </div>
        <h1>Similar Jobs</h1>
        <ul>
          {similar_jobs.map(each => {
            return (
              <li key={each.id}>
                <img
                  alt="similar job company logo"
                  src={each.company_logo_url}
                />
                <h1>{each.title}</h1>
                <p>{each.rating}</p>
                <h1>Description</h1>
                <p>{each.job_description}</p>
                <p>{each.location}</p>
                <p>{each.employment_type}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    return (
      <div>
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for"</p>
        <button onClick={this.getProductData}>Retry</button>
      </div>
    )
  }

  renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
