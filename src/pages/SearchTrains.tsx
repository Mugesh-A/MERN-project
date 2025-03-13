
import { Navbar } from "@/components/layout/Navbar";
import { SearchForm } from "@/components/home/SearchForm";

const SearchTrains = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Train</h1>
          <p className="text-gray-600 mt-2">Search for trains across India</p>
        </div>
        <SearchForm />
      </div>
    </div>
  );
};

export default SearchTrains;
