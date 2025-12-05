import React, { useState } from "react";
import { Menu, X, Search, ChevronRight, Star, Check } from "lucide-react";

// Mock news data
const topStories = [
  {
    id: 1,
    category: "Business",
    title: "Stock markets hit record highs amid positive economic indicators",
    excerpt:
      "Major indices show strong performance as investor confidence grows",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    time: "2 hours ago",
  },
  {
    id: 2,
    category: "Technology",
    title: "AI revolution transforms financial services sector",
    excerpt:
      "Banks and fintech companies embrace artificial intelligence for better customer service",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    time: "4 hours ago",
  },
  {
    id: 3,
    category: "Markets",
    title: "Global trade agreements reshape international commerce",
    excerpt: "New partnerships open doors for emerging markets",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    time: "5 hours ago",
  },
];

const latestNews = [
  {
    id: 1,
    category: "Economy",
    title: "GDP growth exceeds expectations in Q4",
    time: "1 hour ago",
  },
  {
    id: 2,
    category: "Banking",
    title: "Central bank maintains interest rates",
    time: "2 hours ago",
  },
  {
    id: 3,
    category: "Industry",
    title: "Manufacturing sector shows robust growth",
    time: "3 hours ago",
  },
  {
    id: 4,
    category: "Markets",
    title: "Foreign investors increase stake in domestic markets",
    time: "4 hours ago",
  },
  {
    id: 5,
    category: "Policy",
    title: "New regulations aim to boost startup ecosystem",
    time: "5 hours ago",
  },
];

const categories = [
  "Business",
  "Markets",
  "Economy",
  "Banking",
  "Technology",
  "Industry",
  "Opinion",
];

const subscriptionPlans = [
  {
    id: 1,
    name: "Monthly",
    price: 99,
    period: "month",
    popular: false,
    features: [
      "Unlimited access to all articles",
      "Ad-free reading experience",
      "Mobile app access",
      "Daily newsletter",
      "Cancel anytime",
    ],
  },
  {
    id: 2,
    name: "Annual",
    price: 999,
    period: "year",
    popular: true,
    savings: "Save 17%",
    features: [
      "All Monthly features",
      "Exclusive market reports",
      "Priority customer support",
      "Access to premium webinars",
      "Digital magazine archive",
      "Investment insights",
    ],
  },
  {
    id: 3,
    name: "Quarterly",
    price: 279,
    period: "3 months",
    popular: false,
    features: [
      "Unlimited access to all articles",
      "Ad-free reading experience",
      "Mobile app access",
      "Weekly newsletter",
      "Cancel anytime",
    ],
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(2);

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="bg-red-600 text-white py-1">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-xs">
              <span>Friday, December 05, 2025</span>
              <div className="flex items-center space-x-4">
                <span>BSE: 84,564 ↑ 1.2%</span>
                <span>NSE: 25,234 ↑ 0.8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Business Standard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search size={20} />
              </button>
              <button
                onClick={() => setCurrentPage("subscription")}
                className="hidden md:block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav
            className={`${
              menuOpen ? "block" : "hidden"
            } md:block border-t md:border-t-0 py-2`}
          >
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href="#"
                  className="text-gray-700 hover:text-red-600 font-medium py-2 md:py-0"
                >
                  {cat}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Top Stories Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Top Stories</h2>
            <a
              href="#"
              className="text-red-600 hover:text-red-700 font-medium flex items-center"
            >
              View All <ChevronRight size={20} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topStories.map((story) => (
              <article key={story.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-xs font-medium">
                    {story.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-2">{story.excerpt}</p>
                <span className="text-sm text-gray-500">{story.time}</span>
              </article>
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Latest News
            </h2>
            <div className="space-y-6">
              {latestNews.map((news) => (
                <article
                  key={news.id}
                  className="border-b border-gray-200 pb-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs font-medium mb-2">
                        {news.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 hover:text-red-600 cursor-pointer mb-2">
                        {news.title}
                      </h3>
                      <span className="text-sm text-gray-500">{news.time}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Subscribe to Premium
              </h3>
              <p className="text-gray-600 mb-4">
                Get unlimited access to exclusive content, market insights, and
                expert analysis.
              </p>
              <button
                onClick={() => setCurrentPage("subscription")}
                className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                View Plans
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Trending Topics
              </h3>
              <div className="space-y-3">
                {[
                  "Stock Market",
                  "Banking Sector",
                  "Economic Policy",
                  "Tech Startups",
                  "Global Trade",
                ].map((topic, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="block text-gray-700 hover:text-red-600 font-medium"
                  >
                    # {topic}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Business Standard</h3>
              <p className="text-gray-400">
                Your trusted source for business news and analysis.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Sections</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Markets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Economy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Technology
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
                >
                  f
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
                >
                  t
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
                >
                  in
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            © 2025 Business Standard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );

  // Subscription Page Component
  const SubscriptionPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Business Standard
            </h1>
            <button
              onClick={() => setCurrentPage("home")}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Get unlimited access to premium business news, market insights, and
            expert analysis
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? "ring-2 ring-red-600 relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-red-600 text-white text-center py-2 text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                {plan.savings && (
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                    {plan.savings}
                  </span>
                )}

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">/ {plan.period}</span>
                </div>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-lg font-bold transition-colors mb-6 ${
                    selectedPlan === plan.id
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check
                        size={20}
                        className="text-green-600 mr-3 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Button */}
        <div className="text-center mt-12">
          <button className="bg-red-600 text-white px-12 py-4 rounded-lg text-lg font-bold hover:bg-red-700 transition-colors shadow-lg">
            Proceed to Checkout
          </button>
          <p className="text-gray-600 mt-4">
            Cancel anytime. No questions asked.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Subscribe?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Premium Content
              </h3>
              <p className="text-gray-600">
                Access exclusive articles, reports, and analysis from industry
                experts
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="text-red-600"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ad-Free Experience
              </h3>
              <p className="text-gray-600">
                Enjoy uninterrupted reading without any advertisements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="text-red-600"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Mobile Access
              </h3>
              <p className="text-gray-600">
                Read anywhere, anytime on your phone, tablet, or desktop
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Subscribers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The best source for business news. The insights and analysis
                have been invaluable for my investment decisions."
              </p>
              <p className="font-bold text-gray-900">
                - Rajesh Kumar, Investor
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Comprehensive coverage and expert analysis. The subscription
                pays for itself with the quality of content."
              </p>
              <p className="font-bold text-gray-900">
                - Priya Sharma, Business Owner
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Business Standard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );

  return currentPage === "home" ? <HomePage /> : <SubscriptionPage />;
}

export default App;
