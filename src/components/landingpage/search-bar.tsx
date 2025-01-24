"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Clock } from "lucide-react"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const history = localStorage.getItem("searchHistory")
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  const handleSearch = (term: string) => {
    if (term.trim()) {
      const newHistory = [term, ...searchHistory.filter((item) => item !== term)].slice(0, 5)
      setSearchHistory(newHistory)
      localStorage.setItem("searchHistory", JSON.stringify(newHistory))
      router.push(`/search?q=${encodeURIComponent(term)}`)
    }
  }

  return (
    <div className="relative">
      <div className="flex">
        <Input
          type="text"
          placeholder="Search for cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-r-none"
        />
        <Button className="rounded-l-none" onClick={() => handleSearch(searchTerm)}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
      {searchHistory.length > 0 && searchTerm === "" && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1">
          {searchHistory.map((term, index) => (
            <button
              key={index}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handleSearch(term)}
            >
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

