"use client";

import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const SignUpPage = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const email = user?.emailAddresses[0]?.emailAddress;
      if (email === "amir@gmail.com") {
        redirect("/admin");
      }
    }
  }, [isLoaded, user]);

  return (
    <div style={{ margin: "110px" }} className="flex justify-center">
      <SignUp afterSignUpUrl="/" />
    </div>
  );
};

export default SignUpPage;
