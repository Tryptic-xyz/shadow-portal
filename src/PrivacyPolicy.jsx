import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import React from "react";

function PrivacyPolicy() {
  return (
    <div className="max-w-[1520px] w-full min-h-100vh flex flex-col items-center gap-6 px-6 justify-between">
      <NavBar />
      <div className="container mx-auto px-4 py-8 h-full text-white">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500">
            <strong>Last updated: January 1, 2025</strong>
          </p>
          <p className="mt-4">
            ShadowPortal is committed to protecting your privacy. This Privacy
            Policy outlines the types of information we collect and how it is
            used.
          </p>
          <h2 className="mt-4 text-xl font-semibold">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information such as your name, email address,
            and payment details when you use our services. We may also collect
            usage data, such as IP addresses, browser types, and access times.
          </p>
          <h2 className="mt-4 text-xl font-semibold">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to provide, improve, and personalize our
            services. We may also use it for customer support and marketing
            purposes.
          </p>
          <h2 className="mt-4 text-xl font-semibold">3. Data Security</h2>
          <p>
            We take reasonable measures to protect your personal data, but we
            cannot guarantee its absolute security.
          </p>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
