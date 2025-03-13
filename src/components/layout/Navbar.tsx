
import { Button } from "@/components/ui/button";
import { Train, User, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  // Placeholder functions for non-implemented pages
  const handleNotImplemented = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is not implemented yet",
      variant: "default",
    });
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Train className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold text-primary">RailBooker</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/search-trains">Find Trains</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/my-bookings">My Bookings</Link>
            </Button>
            <Button variant="ghost" onClick={handleNotImplemented}>Support</Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleNotImplemented}>
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-down">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="w-full text-left" asChild>
                <Link to="/search-trains">Find Trains</Link>
              </Button>
              <Button variant="ghost" className="w-full text-left" asChild>
                <Link to="/my-bookings">My Bookings</Link>
              </Button>
              <Button variant="ghost" className="w-full text-left" onClick={handleNotImplemented}>Support</Button>
              <Button variant="outline" className="w-full flex items-center gap-2" onClick={handleNotImplemented}>
                <User className="h-4 w-4" />
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
