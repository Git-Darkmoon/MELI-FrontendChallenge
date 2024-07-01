import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (searchQuery.trim() !== "") {
      navigate(`/items?search=${encodeURIComponent(searchQuery)}`)
    }
    event.currentTarget.reset()
  }

  return (
    <header className="searchBar">
      <div className="searchBar__container">
        <a className="searchBar__logo" href="/">
          <img src="/assets/Logo_ML.png" alt="logo" width={53} height={36} />
        </a>
        <form className="searchBar__form" onSubmit={handleSubmit}>
          <input
            aria-label="search bar"
            role="searchbox"
            className="searchBar__input"
            type="search"
            placeholder="Nunca dejes de buscar"
            maxLength={120}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
            required
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="searchBar__submitBtn" type="submit">
            <img
              src="/assets/ic_Search.png"
              alt="Icono de busqueda de elementos"
              width={18}
              height={18}
            />
          </button>
        </form>
      </div>
    </header>
  )
}

export default SearchBar
