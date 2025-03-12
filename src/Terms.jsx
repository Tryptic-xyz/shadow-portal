import React from "react";
import logo from "/icons/shadow-logo.svg"
import Footer from "./Footer.jsx"

function Terms() {
  return (
    <div className="max-w-[1520px] w-full h-screen flex flex-col items-center gap-6 px-6 justify-between">
      <div className="w-full flex justify-center py-8">
        <a href="/">
          <img className="h-20" src={logo} alt="" />
        </a>
      </div>
      <div className="container mx-auto px-4 py-8 h-full text-white">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-500">
          <strong>Last updated: January 1, 2025</strong>
        </p>
        <p className="mt-4">
          Welcome to ShadowPortal! By using our website and services, you agree
          to the following terms and conditions. Please read them carefully.
        </p>
        <h2 className="mt-4 text-xl font-semibold">1. Introduction</h2>
        <p>
          These terms govern your use of ShadowPortal's services. By accessing
          or using our platform, you agree to comply with these terms. If you
          disagree with any part of the terms, you must not use our services.
        </p>
        <h2 className="mt-4 text-xl font-semibold">2. User Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          account and for all activities that occur under your account.
        </p>
        <h2 className="mt-4 text-xl font-semibold">
          3. Limitation of Liability
        </h2>
        <p>
          ShadowPortal is not liable for any damages arising from the use of our
          services, including but not limited to data loss or service
          interruptions.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
