"use client";
import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div style={{ margin: "110px" }} className="flex justify-center">
      <div className="mt-5">
        <SignIn afterSignInUrl="/post-login" />
      </div>
    </div>
  );
};

export default Login;
