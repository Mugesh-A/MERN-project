
// Database of major Indian railway stations with their codes
export interface Station {
  name: string;
  code: string;
  state: string;
}

export const indianStations: Station[] = [
  { name: "New Delhi", code: "NDLS", state: "Delhi" },
  { name: "Mumbai Central", code: "BCT", state: "Maharashtra" },
  { name: "Chennai Central", code: "MAS", state: "Tamil Nadu" },
  { name: "Kolkata Howrah", code: "HWH", state: "West Bengal" },
  { name: "Bangalore City", code: "SBC", state: "Karnataka" },
  { name: "Hyderabad Deccan", code: "HYD", state: "Telangana" },
  { name: "Ahmedabad Junction", code: "ADI", state: "Gujarat" },
  { name: "Pune Junction", code: "PUNE", state: "Maharashtra" },
  { name: "Jaipur Junction", code: "JP", state: "Rajasthan" },
  { name: "Lucknow", code: "LKO", state: "Uttar Pradesh" },
  { name: "Kanpur Central", code: "CNB", state: "Uttar Pradesh" },
  { name: "Patna Junction", code: "PNBE", state: "Bihar" },
  { name: "Bhopal Junction", code: "BPL", state: "Madhya Pradesh" },
  { name: "Amritsar Junction", code: "ASR", state: "Punjab" },
  { name: "Guwahati", code: "GHY", state: "Assam" },
  { name: "Secunderabad Junction", code: "SC", state: "Telangana" },
  { name: "Trivandrum Central", code: "TVC", state: "Kerala" },
  { name: "Nagpur Junction", code: "NGP", state: "Maharashtra" },
  { name: "Vijayawada Junction", code: "BZA", state: "Andhra Pradesh" },
  { name: "Varanasi Junction", code: "BSB", state: "Uttar Pradesh" },
  { name: "Ernakulam Junction", code: "ERS", state: "Kerala" },
  { name: "Surat", code: "ST", state: "Gujarat" },
  { name: "Vadodara Junction", code: "BRC", state: "Gujarat" },
  { name: "Bhubaneswar", code: "BBS", state: "Odisha" },
  { name: "Dehradun", code: "DDN", state: "Uttarakhand" },
  { name: "Coimbatore Junction", code: "CBE", state: "Tamil Nadu" },
  { name: "Visakhapatnam", code: "VSKP", state: "Andhra Pradesh" },
  { name: "Agra Cantt", code: "AGC", state: "Uttar Pradesh" },
  { name: "Jammu Tawi", code: "JAT", state: "Jammu & Kashmir" },
  { name: "Gwalior Junction", code: "GWL", state: "Madhya Pradesh" },
  { name: "Kochi", code: "COK", state: "Kerala" },
  { name: "Indore Junction", code: "INDB", state: "Madhya Pradesh" },
  { name: "Chandigarh", code: "CDG", state: "Chandigarh" },
  { name: "Mysore Junction", code: "MYS", state: "Karnataka" },
  { name: "Allahabad Junction", code: "ALD", state: "Uttar Pradesh" },
  { name: "Jodhpur Junction", code: "JU", state: "Rajasthan" },
  { name: "Gorakhpur Junction", code: "GKP", state: "Uttar Pradesh" },
  { name: "Ranchi", code: "RNC", state: "Jharkhand" },
  { name: "Raipur Junction", code: "R", state: "Chhattisgarh" },
  { name: "Rajkot Junction", code: "RJT", state: "Gujarat" }
];

// Function to search stations by name or code
export const searchStations = (query: string): Station[] => {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  return indianStations.filter(
    station => 
      station.name.toLowerCase().includes(lowerQuery) || 
      station.code.toLowerCase().includes(lowerQuery)
  ).slice(0, 5); // Limit results to 5 stations
};
