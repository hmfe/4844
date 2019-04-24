import React from 'react';
import { fetchRecepies } from '../../helpers/fetchRecepies';
import { getTimestamp } from '../../helpers/getTimeStamp';
import './searchComponent.css';

export class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchResults: [],
      searchHistory: [],
    };
  }
  
  keyPressTimeout = null;

  handleChange(searchString) {
    // Prevents the search from being fired on every keystroke or if the input is empty.
    clearTimeout(this.keyPressTimeout);
    if (searchString.length > 0) {
      this.setState({isSearching: true});
      this.keyPressTimeout = setTimeout(() => {
        fetchRecepies(searchString).then(
          data => this.setState({searchResults: data, isSearching: false})
          )
        }, 500);
      } else {
        this.clearSearch();
      }
    }

    saveSearchToState(search) {
      this.setState({
        searchHistory: [
          ...this.state.searchHistory, 
          {id: search.id, title: search.title, timestamp: getTimestamp()}
        ],
        searchResults: []
      })
      this.clearSearch()
    }
    
    removeSearchItem(e, id) {
      e.preventDefault();
      const newState = this.state.searchHistory.filter(search => search.id !== id);
      this.setState({searchHistory: newState})
    }

    clearSearch(e) {
      e && e.preventDefault();
      this.setState({searchResults: []})
      document.getElementById('searchInput').value = ''
    }

    clearSearchHistory(e) {
      e.preventDefault();
      this.setState({searchHistory: []})
    }
    
    renderSearchResultList(searchResults) {
      const isActive = searchResults.length > 0 ? 'Active' : '';
      return (
        <ul className={`searchResultList${isActive}`} >
            {searchResults.map((result, index) => {
              return (
                <li className="searchListItem" onClick={() => this.saveSearchToState(result)} key={index}> { result.title } </li>
              )
          })}
          </ul>
        )
      }

    renderSearchHistory() {
      const { searchHistory } = this.state;
      return (
        <div className="searchHistoryWrapper">
        <div className="searchHistoryHeader">
          <h2>Search history</h2>
          <button className="textButtonClear" aria-label="Clear search history" onClick={(e) => this.clearSearchHistory(e)}>Clear search history</button>
        </div>
          <ul className="searchHistoryList">
            {searchHistory.length > 0 ? searchHistory.map(((search, index) => 
              <li key={index} className="searchHistoryListItem">
                <p className="listItemText">{search.title}</p>
                <p className="timestamp">{search.timestamp}
                  <button className="buttonClear" aria-label="Remove item" onClick={(e) => this.removeSearchItem(e, search.id)}/>
                </p>
              </li>
            )) : <p className="noContentPlaceholder"> Nothing to show here </p>}
          </ul>
        </div>
      )
    }

  render() {
    return (
      <div className="searchComponentWrapper">
        <h1> Task #1 </h1>
        <section>
          <button type="button" class="btn"> Delete </button>
        </section>
        <h1> Task #3 </h1>
        {/* Considered using a <form> here but for this case but ended up using a <section> instead
        of building a keyup listener for enter to prevent <form> from firing. */}
        <section name="searchForm" className="searchForm">
          <div className="inputWrapper">
            <input 
              className="searchInput"
              id="searchInput"
              autoComplete="off"
              type="text" 
              placeholder="Search for recepie" 
              onChange={e => this.handleChange(e.target.value)}/>
            <button aria-label="Clear search input" className="buttonClear" onClick={(e) => this.clearSearch(e)}/>
          </div>
          {this.renderSearchResultList(this.state.searchResults)}
          {this.renderSearchHistory()}
        </section>
      </div>
    )
  }
}
