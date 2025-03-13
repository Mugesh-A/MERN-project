
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Train } from "lucide-react";

// Mock database for bookings (in a real app, this would come from a backend)
interface Booking {
  id: string;
  trainNumber: string;
  trainName: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  seatNumber: string;
  status: "confirmed" | "waitlisted" | "cancelled";
}

// Sample data
const mockBookings: Booking[] = [
  {
    id: "PNR12345678",
    trainNumber: "12302",
    trainName: "Howrah Rajdhani",
    from: "New Delhi",
    to: "Kolkata Howrah",
    date: "2023-08-15",
    departureTime: "16:55",
    arrivalTime: "10:00",
    seatNumber: "B1-22",
    status: "confirmed",
  },
  {
    id: "PNR87654321",
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani",
    from: "New Delhi",
    to: "Mumbai Central",
    date: "2023-09-22",
    departureTime: "16:25",
    arrivalTime: "08:15",
    seatNumber: "A1-18",
    status: "confirmed",
  },
  {
    id: "PNR76543210",
    trainNumber: "12259",
    trainName: "Sealdah Duronto",
    from: "New Delhi",
    to: "Kolkata Sealdah",
    date: "2023-10-05",
    departureTime: "12:55",
    arrivalTime: "04:50",
    seatNumber: "Waitlist #5",
    status: "waitlisted",
  },
];

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data from a database
    const fetchBookings = () => {
      setTimeout(() => {
        setBookings(mockBookings);
        setLoading(false);
      }, 1000);
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = (id: string) => {
    // In a real app, you would call an API to cancel the booking
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" as const } : booking
      )
    );

    toast({
      title: "Booking Cancelled",
      description: `Booking ${id} has been cancelled successfully.`,
    });
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "waitlisted":
        return "text-orange-600 bg-orange-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Bookings</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Train className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-600">No bookings found</h2>
            <p className="text-gray-500 mt-2">You haven't made any train bookings yet.</p>
            <Button className="mt-6" asChild>
              <a href="/">Book a Train</a>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Train className="h-5 w-5 text-primary" />
                    <span className="font-medium">{booking.trainName}</span>
                    <span className="text-sm text-gray-500">({booking.trainNumber})</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="text-xl font-semibold">{booking.departureTime}</div>
                      <div className="text-gray-500">{booking.from}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="border-b border-dashed border-gray-300 w-20 md:w-40"></div>
                      <div className="text-sm text-gray-500 mt-1">{booking.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold">{booking.arrivalTime}</div>
                      <div className="text-gray-500">{booking.to}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-sm text-gray-500">PNR / Booking ID</div>
                      <div className="font-medium">{booking.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Seat</div>
                      <div className="font-medium">{booking.seatNumber}</div>
                    </div>
                    {booking.status !== "cancelled" && (
                      <Button
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
