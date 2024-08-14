import {Component} from 'react'
// import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FiltersGroup extends Component {
  state = {
    selectedEmploymentTypes: [],
    selectedGender: '',
  }

  onchange = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  onEnter = event => {
    const {enterSearchInput} = this.props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  handleCheckboxChange = event => {
    const {name, checked} = event.target
    let selectedTypes = this.state.selectedEmploymentTypes.slice()

    if (checked) {
      selectedTypes.push(name)
    } else {
      selectedTypes = selectedTypes.filter(type => type !== name)
    }

    this.setState({
      selectedEmploymentTypes: selectedTypes,
    })
    const {changeemplayement} = this.props
    changeemplayement(selectedTypes)
  }

  handleGenderChange = event => {
    const {changesalary} = this.props
    changesalary(event.target.value)
  }

  onclickenter = () => {
    const {funforinput} = this.props
    funforinput()
  }

  render() {
    const {searchInput} = this.props
    return (
      <>
        <h1>Type of Employment</h1>
        <input
          type="search"
          value={searchInput}
          onKeyDown={this.onEnter}
          onChange={this.onchange}
        />
        <button
          onClick={this.onclickenter}
          type="button"
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>

        <ul>
          {employmentTypesList.map(each => {
            return (
              <li key={each.employmentTypeId}>
                <label>
                  <input
                    type="checkbox"
                    name={each.employmentTypeId}
                    onClick={this.handleCheckboxChange}
                  />
                  {each.label}
                </label>
                <br />
              </li>
            )
          })}
        </ul>
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId}>
              <label htmlFor={each.salaryRangeId}>{each.label}</label>
              <input
                id={each.salaryRangeId}
                type="radio"
                name="gender"
                value={each.salaryRangeId}
                onChange={this.handleGenderChange}
              />
            </li>
          ))}
        </ul>
      </>
    )
  }
}
export default FiltersGroup
