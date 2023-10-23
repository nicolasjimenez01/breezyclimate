



export default function SearchBox() {
  return (
    <div className="w-full max-w-lg mb-10">
    <div className="relative text-gray-600">
      <input
        type="search"
        name="search"
        placeholder="Buscar..."
        className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <svg
          className="text-gray-600 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 56.966 56.966"
          width="512"
          height="512"
        >
          <path
            d="M55.146 51.579L41.803 38.236a22.707 22.707 0 001.172-8.186c0-12.515-10.185-22.701-22.701-22.701-12.516 0-22.701 10.186-22.701 22.701 0 12.516 10.185 22.701 22.701 22.701 2.599 0 5.156-.443 7.594-1.313l12.364 12.363c.391.391.902.587 1.413.587.512 0 1.022-.196 1.414-.587 1.953-1.954 1.953-5.122-.001-7.076zM9.101 30.421c0-9.973 8.128-18.101 18.101-18.101 9.974 0 18.102 8.128 18.102 18.101 0 9.974-8.128 18.101-18.102 18.101-9.973 0-18.101-8.127-18.101-18.101z"
          />
        </svg>
      </button>
    </div>
  </div>
  )
}