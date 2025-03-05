import React from "react";
import UserProfile from "@/components/auth/UserProfile";
import Navigation from "@/components/layout/Navigation";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Navigation />
        <div className="mt-8">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
