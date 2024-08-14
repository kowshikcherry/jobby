import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import Jobitems from '../Jobitems'
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

const apiStatusforjobs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profile: {},
    jobsection: [],
    apiStatus: apiStatusConstants.initial,
    apistatsgorjobs: apiStatusforjobs.initial,
    activetypeofemplayement: [],
    searchInput: '',
    salaryrange: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getjobs()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`
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
        profile: profiledata,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getjobs = async () => {
    this.setState({
      apistatsgorjobs: apiStatusforjobs.inProgress,
    })

    const {activetypeofemplayement, searchInput, salaryrange} = this.state

    const joinactiveemployement = activetypeofemplayement.join(',')

    const apiUrlfrojobs = `https://apis.ccbp.in/jobs?employment_type=${joinactiveemployement}&minimum_package=${salaryrange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const responseforjobs = await fetch(apiUrlfrojobs, options)

    if (responseforjobs.ok) {
      const jobsdata = await responseforjobs.json()

      // console.log(jobsdata.jobs)

      this.setState({
        jobsection: [...jobsdata.jobs],
        apistatsgorjobs: apiStatusforjobs.success,
      })
    } else {
      this.setState({
        apistatsgorjobs: apiStatusforjobs.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  showprofilesuccess = () => {
    const {profile} = this.state
    const {profile_details} = profile
    const {profile_image_url, short_bio, name} = profile_details
    return (
      <>
        <img className="profileimg" src={profile_image_url} alt="profile" />
        <h1 className="profilehead">{name}</h1>
        <p className="profilepara">{short_bio}</p>
      </>
    )
  }

  shiprofilefailure = () => (
    <>
      <button onClick={this.getProfile} type="button">
        Retry
      </button>
    </>
  )

  showprofileornot = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.showprofilesuccess()
      case apiStatusConstants.failure:
        return this.shiprofilefailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  enterSearchInput = () => {
    this.getjobs()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }
  changeemplayement = value => {
    this.setState({activetypeofemplayement: value}, this.getjobs)
  }

  showjobsfailure = () => {
    return (
      <div>
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>

        <button onClick={this.getjobs}>Retry</button>
      </div>
    )
  }

  showjobssuccess = () => {
    const {jobsection} = this.state
    if (jobsection.length === 0) {
      return (
        <div className="notfound">
          <img
            alt="no jobs"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <>
        {jobsection.map(each => {
          return (
            <li key={each.id}>
              <Jobitems each={each} />
            </li>
          )
        })}
      </>
    )
  }

  ////////////////////////////////////////////////////////////////
  renderjobitems = () => {
    const {apistatsgorjobs} = this.state

    switch (apistatsgorjobs) {
      case apiStatusConstants.success:
        return this.showjobssuccess()
      case apiStatusConstants.failure:
        return this.showjobsfailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  changesalary = salaryrange => {
    this.setState({salaryrange}, this.getjobs)
  }

  funforinput = () => {
    this.getjobs()
  }

  render() {
    const {activetypeofemplayement, searchInput, salaryrange} = this.state
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          <div className="all-products-section">
            <div className="progile">{this.showprofileornot()}</div>
            <div className="all-products-section">
              <FiltersGroup
                searchInput={searchInput}
                changeSearchInput={this.changeSearchInput}
                enterSearchInput={this.enterSearchInput}
                activetypeofemplayement={activetypeofemplayement}
                salaryrange={salaryrange}
                changeemplayement={this.changeemplayement}
                changesalary={this.changesalary}
                funforinput={this.funforinput}
              />
            </div>
          </div>
          <ul>{this.renderjobitems()}</ul>
        </div>
      </>
    )
  }
}

export default Jobs
