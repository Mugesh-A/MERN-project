import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";

export const Hero = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error fetching data"));
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 pt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-down">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {message} {/* Dynamic message from the backend */}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search, compare, and book train tickets across India with ease.
            Travel smart with RailBooker.
          </p>
        </div>
        <SearchForm />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Easy Booking",
    description:
      "Book your train tickets in just a few clicks with our simple and intuitive interface.",
    icon: ({ className }: { className?: string }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    title: "Live Updates",
    description:
      "Get real-time updates about your train's status, platform changes, and more.",
    icon: ({ className }: { className?: string }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description:
      "Our customer support team is always ready to help you with any queries.",
    icon: ({ className }: { className?: string }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
];
