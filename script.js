// with the exception of one of Identity, Email, or FBID
// each of the following fields is optional

if (ServiceWorker in navigator) {
  navigator.serviceWorker
    .register("clevertap_sw.js")
    .then(function (registration) {
      console.log("Service Worker Registered");
      console.log(registration);
    })
    .catch(function (error) {
      console.log("Service Worker Registration Failed");
      console.log(error);
    });
}

function onLogin() {
  document.getElementById("login").addEventListener("click", function (event) {
    // Get date from frontend input
    const subscriptionExpiryDateInput = document.getElementById(
      "subscriptionExpiryDate"
    );
    const expiryDate = subscriptionExpiryDateInput
      ? new Date(subscriptionExpiryDateInput.value)
      : null;

    clevertap.onUserLogin.push({
      Site: {
        Name: "Push Test", // String
        Identity: 22222, // String or number
        Email: "pushtest@gmail.com", // Email address of the user
        Phone: "+56765676567", // Phone (with the country code),
        Gender: "M", // Can be either M or F
        DOB: new Date(), // Date of Birth. Date object

        SubscriptionExpiryDate: expiryDate,

        // optional fields. controls whether the user will be sent email, push etc.
        "MSG-email": false, // Disable email notifications
        "MSG-push": true, // Enable push notifications
        "MSG-sms": true, // Enable sms notifications
        "MSG-whatsapp": true, // Enable WhatsApp notifications
      },
    });
    console.log("User logged in");
    console.log("Test DateTime: ", subscriptionExpiryDateInput.value);
    // alert(clevertap.getClevertapID());
  });
}

/* clevertap.profile.push({
  Site: {
    "Customer Type": "Silver",
    "Prefered Language": "English",
  },
}); */

function viewProduct() {
  document.getElementById("btn1").addEventListener("click", function (event) {
    alert("button clicked!");
    clevertap.event.push("Product Viewed", {
      "Product name": "Casio Chronograph Watch",
      Category: "Mens Accessories",
      Price: 59.99,
      Date: new Date(),
    });
  });
}

function onSubscribe() {
  document.getElementById("btn2").addEventListener("click", function (event) {
    alert("Clicked Subscribe");
    clevertap.notifications.push({
      titleText: "Would you like to receive Push Notifications?",
      bodyText:
        "We promise to only send you relevant content and give you updates on your transactions",
      okButtonText: "Sign me up!",
      rejectButtonText: "No thanks",
      okButtonColor: "#f28046",
    });
  });
}

function onWebPush() {
  document.getElementById("btn4").addEventListener("click", function (event) {
    alert("Clicked web push button");
    clevertap.event.push("Web-push Event");
  });
}

function onPopup() {
  document.getElementById("btn5").addEventListener("click", function (event) {
    alert("Web popup button clicked");
    clevertap.event.push("Web-Popup Event");
  });
}

function newPopup() {
  document.getElementById("btn7").addEventListener("click", function (event) {
    clevertap.notifications.push({
      titleText: "Would you like to receive Push Notifications?",
      bodyText:
        "We promise to only send you relevant content and give you updates on your transactions",
      okButtonText: "Sign me up!",
      rejectButtonText: "No thanks",
      okButtonColor: "#F28046",
      askAgainTimeInSeconds: 5,
    });
    console.log("New popup button clicked");
  });
}

function onExit() {
  document.getElementById("btn6").addEventListener("click", function (event) {
    console.log("Exit button clicked");
  });
}

function onnativeBanner() {
  document.getElementById("btn3").addEventListener("click", function (event) {
    console.log("Native button clicked");
    // Push the event that will trigger the native display
    clevertap.event.push("Native Event", {
      // You can add any properties here that might be useful for targeting
      test: true,
      source: "button_click",
    });
    document.dispatchEvent(testEvent);
  });
}

function getCTid() {
  document.getElementById("ctid").addEventListener("click", function (event) {
    console.log("Clevertap ID: " + clevertap.getCleverTapID());
  });
}

function clearCache() {
  document.getElementById("clear").addEventListener("click", function (event) {
    console.log("Clearing cache");
    localStorage.clear();
  });
}

// Initialize the image carousel functionality for CleverTap native display
function initImageCarousel() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const carouselContainer = document.querySelector(".carousel-container");

  if (prevBtn && nextBtn && carouselContainer) {
    // Scroll left on previous button click
    prevBtn.addEventListener("click", () => {
      carouselContainer.scrollBy({ left: -300, behavior: "smooth" });
    });

    // Scroll right on next button click
    nextBtn.addEventListener("click", () => {
      carouselContainer.scrollBy({ left: 300, behavior: "smooth" });
    });
  }
}

// Function to handle CleverTap Native Display data for the image carousel
function handleCarouselNativeDisplay(data) {
  const carouselContainer = document.querySelector(".carousel-container");

  if (!carouselContainer || !data || !data.kv) {
    console.error("Missing carousel container or data");
    return;
  }

  // Clear existing content
  carouselContainer.innerHTML = "";

  // Check if we have image data in the custom key-value pairs
  const images = [];

  // Look for image URLs in the data.kv object (image1, image2, etc.)
  for (let i = 1; i <= 5; i++) {
    // Support up to 5 images
    const imageKey = `image${i}`;
    const titleKey = `title${i}`;
    const linkKey = `link${i}`;

    if (data.kv[imageKey]) {
      images.push({
        imageUrl: data.kv[imageKey],
        title: data.kv[titleKey] || `Product ${i}`,
        link: data.kv[linkKey] || "#",
      });
    }
  }

  // Simple image file extension check
  const imageRegex = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i;

  // Create carousel items for each item
  images.forEach((item, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";

    const isImage = imageRegex.test(item.imageUrl);

    if (isImage) {
      // If it's an image URL, show it as an image
      carouselItem.innerHTML = `
        <a href="${item.link}" target="_blank">
          <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
          <div class="carousel-caption">${item.title}</div>
        </a>
      `;
    } else {
      // If it's not an image URL (like an article URL), show a card instead
      carouselItem.innerHTML = `
        <a href="${
          item.link || item.imageUrl
        }" target="_blank" style="display:block;height:200px;padding:15px;text-decoration:none;color:inherit;background:#f6f7fb;border-radius:8px;">
          <div style="text-align:center;">
            <h3 style="font-size:16px;margin:0 0 10px 0;">${item.title}</h3>
            <p style="margin:0;color:#555;font-size:13px;overflow:hidden;text-overflow:ellipsis;">${item.imageUrl.substring(
              0,
              80
            )}...</p>
          </div>
        </a>
      `;
    }

    carouselContainer.appendChild(carouselItem);
  });

  // Initialize carousel controls
  initImageCarousel();
}

// Listen for CleverTap native display events
document.addEventListener("CT_web_native_display", function (event) {
  console.log("CT_web_native_display event received:", event.detail);

  // Debug: Show exactly what keys and values are in the payload
  if (event.detail && event.detail.kv) {
    console.log("Native display keys:", Object.keys(event.detail.kv));
    console.log("Looking for topic:", event.detail.kv.topic);
    console.log("Looking for displayType:", event.detail.kv.displayType);
  }

  if (event.detail && event.detail.kv) {
    // Check if this is for our carousel by looking for either displayType or topic
    if (
      event.detail.kv.displayType === "imageCarousel" ||
      event.detail.kv.topic === "imageCarousel"
    ) {
      handleCarouselNativeDisplay(event.detail);
    } else {
      console.log("No match for imageCarousel in either displayType or topic");
    }
  }
});

// Initialize the carousel on page load
document.addEventListener("DOMContentLoaded", function () {
  initImageCarousel();
});
