function SearchBar() {
  return (
    <header role="searchbox" aria-label="search bar" className="searchBar">
      <div className="searchBar__container">
        <picture className="searchBar__logo">
          <img src="/assets/Logo_ML.png" alt="logo" />
        </picture>
        <form className="searchBar__form">
          <input
            className="searchBar__input"
            type="text"
            placeholder="Search"
            maxLength={120}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
          />
          <button className="searchBar__subtmitBtn">Search</button>
        </form>
      </div>
    </header>
  )
}
export default SearchBar
