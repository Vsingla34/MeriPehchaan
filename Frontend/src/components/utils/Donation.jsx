import React, { useState } from "react";
import { Heart } from "lucide-react";

const Donation = () => {
  const [donationAmount, setDonationAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");

  const presetAmounts = [100, 250, 500, 1000];

  const handleAmountClick = (amount) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setDonationAmount(Number(value));
    }
  };


 



  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      amount: donationAmount,
      name: e.target.name.value,
      email: e.target.email.value,
    });
    alert(`Thank you for your donation of ${donationAmount}₹!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden md:flex">
          <div className="w-full md:w-1/2 p-8 sm:p-12 text-white bg-gradient-to-br from-emerald-500 to-cyan-600 flex flex-col justify-center">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="h-10 w-10" />
              <h1 className="text-3xl font-bold">MeriPehchaan</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4">Make a Difference Today</h2>
            <p className="text-lg opacity-90">
              Your contribution helps us create lasting change through education,
              healthcare, and sustainable development initiatives. Every donation,
              no matter the size, has a powerful impact.
            </p>
          </div>

          <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Join Our Mission
            </h3>

            <form onSubmit={handleFormSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose an amount
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountClick(amount)}
                      className={`px-4 py-3 text-center rounded-lg border-2 font-medium transition-all duration-300 ${
                        donationAmount === amount
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "bg-gray-50 border-gray-300 text-gray-800 hover:border-emerald-500"
                      }`}
                    >
                      {amount}₹
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Or enter custom amount"
                  className="mt-4 w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
              >
                Donate Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;