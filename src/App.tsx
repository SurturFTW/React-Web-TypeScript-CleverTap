import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import clevertap from "clevertap-web-sdk";
// @ts-ignore: no type declarations for darkmode-js
import Darkmode from "darkmode-js";
import { useNavigate } from "react-router-dom";

// clevertap.init("TEST-865-ZRW-7K7Z", "eu1");
clevertap.init("677-ZZ6-7K7Z", "eu1", "", "611-aa6");
clevertap.setLogLevel(4);
clevertap.privacy.push({ optOut: false });
clevertap.privacy.push({ useIP: true });

interface CarouselItem {
  imageUrl: string;
  title: string;
  link: string;
}

interface UserProfile {
  Name: string;
  Identity: string;
  Email: string;
  Phone: string;
  Gender?: "M" | "F";
}

interface MessageFlags {
  email: boolean;
  push: boolean;
  sms: boolean;
  whatsapp: boolean;
}

function App() {
  const options = {
    bottom: "64px", // default: '32px'
    right: "unset", // default: '32px'
    left: "32px", // default: 'unset'
    time: "0.5s", // default: '0.3s'
    mixColor: "#fff", // default: '#fff'
    backgroundColor: "#fff", // default: '#fff'
    buttonColorDark: "#100f2c", // default: '#100f2c'
    buttonColorLight: "#fff", // default: '#fff'
    saveInCookies: false, // default: true,
    label: "🌓", // default: ''
    autoMatchOsTheme: true, // default: true
  };

  const darkmode = new Darkmode(options);
  darkmode.showWidget();

  const navigate = useNavigate();

  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [notificationDetail, setNotificationDetail] = useState<any>(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [ctId, setCtId] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    Name: "",
    Identity: "1912",
    Email: "",
    Phone: "",
    Gender: "M",
  });
  const [messageFlags, setMessageFlags] = useState<MessageFlags>({
    email: false,
    push: true,
    sms: true,
    whatsapp: true,
  });
  const carouselRef = useRef<HTMLDivElement>(null);

  // Initialize CleverTap
  useEffect(() => {
    clevertap.init("677-ZZ6-7K7Z", "eu1", "", "611-aa6");
    clevertap.setLogLevel(4);
    clevertap.privacy.push({ optOut: false });
    clevertap.privacy.push({ useIP: true });

    // Get CleverTap ID after initialization
    const id = clevertap.getCleverTapID();
    if (id) {
      setCtId(id);
    }
  }, []);

  // Handler functions
  const onLogin = () => {
    clevertap.onUserLogin.push({
      Site: {
        Name: userProfile.Name,
        Identity: userProfile.Identity,
        Email: userProfile.Email,
        Phone: userProfile.Phone,
        Gender: userProfile.Gender,
        DOB: new Date(),
        "MSG-email": messageFlags.email,
        "MSG-push": messageFlags.push,
        "MSG-sms": messageFlags.sms,
        "MSG-whatsapp": messageFlags.whatsapp,
      },
    });
    console.log("User logged in with profile:", userProfile);
    console.log("Message flags:", messageFlags);
    setShowLoginModal(false);
    alert("User logged in successfully!");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFlagChange = (flag: keyof MessageFlags, value: boolean) => {
    setMessageFlags((prev) => ({ ...prev, [flag]: value }));
  };

  const viewProduct = () => {
    clevertap.event.push("Product Viewed", {
      "Product name": "Casio Chronograph Watch",
      Category: "Mens Accessories",
      Price: 59.99,
      Date: new Date(),
    });
    alert("Product viewed event pushed!");
  };

  const onSubscribe = () => {
    clevertap.notifications.push({
      titleText: "Would you like to receive Push Notifications?",
      bodyText:
        "We promise to only send you relevant content and give you updates on your transactions",
      okButtonText: "Sign me up!",
      rejectButtonText: "No thanks",
      okButtonColor: "#f28046",
    });
  };

  const onWebPush = () => {
    clevertap.event.push("Web-push Event");
    alert("Web push event sent");
  };

  const onPopup = () => {
    clevertap.event.push("Web-Popup Event");
    alert("Web popup event sent");
  };

  const onExit = () => {
    console.log("Exit intent triggered");
  };

  const onnativeBanner = () => {
    clevertap.event.push("Native Event", {
      test: true,
      source: "button_click",
    });
  };

  const onCustomPopup = () => {
    clevertap.event.push("Article Click");
    alert("Article event sent");
  };

  const onScratchCard = () => {
    clevertap.event.push("Scratch Card");
    alert("Scratch card event sent");
  };

  const onStories = () => {
    clevertap.event.push("Stories Event");
  };

  const onBFSale = () => {
    clevertap.event.push("Black Friday Sale");
  };

  const onTopBanner = () => {
    clevertap.event.push("Top Banner");
  };

  const onBottomBanner = () => {
    clevertap.event.push("Bottom Banner");
  };

  const onSurveyForm = () => {
    clevertap.event.push("Survey Form Event");
  };

  useEffect(() => {
    // Get CleverTap ID when component mounts
    const id = clevertap.getCleverTapID();
    if (id) {
      setCtId(id);
    }
  }, []);

  const getCTid = () => {
    const ctId = clevertap.getCleverTapID();
    console.log("CleverTap ID:", ctId);
    setCtId(ctId || "");
    alert(`CleverTap ID: ${ctId}`);
  };

  const clearCache = () => {
    localStorage.clear();
    console.log("Cache cleared");
    alert("Cache cleared!");
  };

  function onProductExperiences() {
    navigate("/payment");
  }

  // Handler to display the carousel
  function handleCarouselNativeDisplay(detail: any) {
    if (detail && detail.kv) {
      clevertap.renderNotificationViewed(detail);
      setNotificationDetail(detail);

      const items: CarouselItem[] = [];

      if (detail.kv.image) {
        items.push({
          imageUrl: detail.kv.image,
          title: detail.kv.title || "Default Title",
          link: detail.kv.link || "#",
        });
      }

      for (let i = 1; i <= 5; i++) {
        const imageKey = `image${i}`;
        const titleKey = `title${i}`;
        const linkKey = `link${i}`;
        if (detail.kv[imageKey]) {
          items.push({
            imageUrl: detail.kv[imageKey],
            title: detail.kv[titleKey] || `Product ${i}`,
            link: detail.kv[linkKey] || "#",
          });
        }
      }

      setCarouselItems(items);
      setShowCarousel(items.length > 0);
    } else {
      setCarouselItems([]);
      setNotificationDetail(null);
      setShowCarousel(false);
    }
  }

  // Register event listener
  useEffect(() => {
    function onCTWebNativeDisplay(event: any) {
      console.log("CT_web_native_display event received:", event);
      if (event.detail && event.detail.kv) {
        console.log("Native display keys:", Object.keys(event.detail.kv));
        console.log("Looking for topic:", event.detail.kv.topic);
        if (
          event.detail.kv.displayType === "imageCarousel" ||
          event.detail.kv.topic === "blueprint"
        ) {
          handleCarouselNativeDisplay(event.detail);
        }
      }
    }
    document.addEventListener("CT_web_native_display", onCTWebNativeDisplay);
    return () => {
      document.removeEventListener(
        "CT_web_native_display",
        onCTWebNativeDisplay
      );
    };
  }, []);

  // Carousel navigation
  const scrollBy = (offset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleCarouselItemClick = () => {
    if (notificationDetail) {
      clevertap.renderNotificationClicked(notificationDetail);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Login</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="Name"
                  value={userProfile.Name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Identity/User ID
                </label>
                <input
                  type="text"
                  name="Identity"
                  value={userProfile.Identity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter identity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={userProfile.Email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="Phone"
                  value={userProfile.Phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="Gender"
                  value={userProfile.Gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>

              {/* Message Preferences */}
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Message Preferences
                </label>
                <div className="space-y-3">
                  {/* Email */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Email</span>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="email"
                          checked={messageFlags.email === true}
                          onChange={() => handleFlagChange("email", true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer ml-4">
                        <input
                          type="radio"
                          name="email"
                          checked={messageFlags.email === false}
                          onChange={() => handleFlagChange("email", false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Push */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      Push Notifications
                    </span>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="push"
                          checked={messageFlags.push === true}
                          onChange={() => handleFlagChange("push", true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer ml-4">
                        <input
                          type="radio"
                          name="push"
                          checked={messageFlags.push === false}
                          onChange={() => handleFlagChange("push", false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">No</span>
                      </label>
                    </div>
                  </div>

                  {/* SMS */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">SMS</span>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="sms"
                          checked={messageFlags.sms === true}
                          onChange={() => handleFlagChange("sms", true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer ml-4">
                        <input
                          type="radio"
                          name="sms"
                          checked={messageFlags.sms === false}
                          onChange={() => handleFlagChange("sms", false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">No</span>
                      </label>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">WhatsApp</span>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="whatsapp"
                          checked={messageFlags.whatsapp === true}
                          onChange={() => handleFlagChange("whatsapp", true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer ml-4">
                        <input
                          type="radio"
                          name="whatsapp"
                          checked={messageFlags.whatsapp === false}
                          onChange={() => handleFlagChange("whatsapp", false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onLogin}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  CleverTap Web SDK
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Test and demo various SDK features
                </p>
                {ctId && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                    CT ID: {ctId}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Connected
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Actions Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Quick Actions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Test core CleverTap functionality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Login Card */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    User Authentication
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Login and identify user
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 h-10 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Login User
              </button>
            </div>

            {/* View Product Card */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Product View
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Track product interactions
                  </p>
                </div>
              </div>
              <button
                onClick={viewProduct}
                className="w-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 h-10 px-4 py-2 rounded-md font-medium transition-colors"
              >
                View Product
              </button>
            </div>

            {/* Subscribe Card */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Subscription
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage subscriptions
                  </p>
                </div>
              </div>
              <button
                onClick={onSubscribe}
                className="w-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 h-10 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Engagement Features Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Engagement Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Test various engagement campaigns and notifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Native Display */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-orange-600 dark:text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                  Native Display
                </h3>
              </div>
              <button
                onClick={onnativeBanner}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 h-9 px-3 rounded-md text-sm font-medium text-gray-900 dark:text-white transition-colors"
              >
                Trigger
              </button>
            </div>

            {/* Web Push */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-cyan-600 dark:text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                  Web Push
                </h3>
              </div>
              <button
                onClick={onWebPush}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 h-9 px-3 rounded-md text-sm font-medium text-gray-900 dark:text-white transition-colors"
              >
                Trigger
              </button>
            </div>

            {/* Exit Intent */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                  Exit Intent
                </h3>
              </div>
              <button
                onClick={onExit}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 h-9 px-3 rounded-md text-sm font-medium text-gray-900 dark:text-white transition-colors"
              >
                Trigger
              </button>
            </div>

            {/* Web Popup */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                  Web Popup
                </h3>
              </div>
              <button
                onClick={onPopup}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 h-9 px-3 rounded-md text-sm font-medium text-gray-900 dark:text-white transition-colors"
              >
                Trigger
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Advanced Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive campaigns and utilities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Subscription Popup */}
            <button
              onClick={onCustomPopup}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-2 group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-pink-600 dark:text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                Subscription Popup
              </span>
            </button>

            {/* Scratch Card */}
            <button
              onClick={onScratchCard}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-2 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                Scratch Card
              </span>
            </button>

            {/* Survey Form */}
            <button
              onClick={onSurveyForm}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-2 group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-teal-600 dark:text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2v2M9 16h.01M9 12h.01"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                Survey Form
              </span>
            </button>

            {/* Stories */}
            <button
              onClick={onStories}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-2 group-hover:bg-violet-200 dark:group-hover:bg-violet-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-violet-600 dark:text-violet-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                Stories
              </span>
            </button>

            {/* Black Friday Sale */}
            <button
              onClick={onBFSale}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-2 group-hover:bg-rose-200 dark:group-hover:bg-rose-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-rose-600 dark:text-rose-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                Black Friday Sale
              </span>
            </button>

            {/* Top Banner */}
            <button
              onClick={onTopBanner}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                Top Banner
              </span>
            </button>

            {/* Bottom Banner */}
            <button
              onClick={onBottomBanner}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center mb-2 group-hover:bg-lime-200 dark:group-hover:bg-lime-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-lime-600 dark:text-lime-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                Bottom Banner
              </span>
            </button>

            {/* Product Experiences */}
            <button
              onClick={onProductExperiences}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center mb-2 group-hover:bg-lime-200 dark:group-hover:bg-lime-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-lime-600 dark:text-lime-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                Product Experiences
              </span>
            </button>

            {/* Get CT ID */}
            <button
              onClick={getCTid}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-2 group-hover:bg-sky-200 dark:group-hover:bg-sky-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-sky-600 dark:text-sky-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                Get CT ID
              </span>
            </button>

            {/* Clear Cache */}
            <button
              onClick={clearCache}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-2 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center text-red-600 dark:text-red-400">
                Clear Cache
              </span>
            </button>
          </div>
        </div>

        {/* Image Carousel Section */}
        {showCarousel && (
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-8">
            <div className="p-6 pb-0">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Top News
                  </h2>
                  <p className="text-gray-600">
                    Latest updates and featured content
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-xs text-gray-600">
                    Native Display Active
                  </span>
                </div>
              </div>
            </div>

            <div className="relative w-full p-6">
              <div
                className="flex overflow-x-auto gap-6 pb-4 snap-x"
                ref={carouselRef}
                style={{
                  scrollBehavior: "smooth",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                }}
              >
                {carouselItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-none w-72 snap-start relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
                  >
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleCarouselItemClick}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-52 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 text-center">
                        {item.title}
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => scrollBy(-300)}
                className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 border border-gray-200 shadow-lg backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={() => scrollBy(300)}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 border border-gray-200 shadow-lg backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              CleverTap Web SDK Demo.
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Version 1.0.0
              </span>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
