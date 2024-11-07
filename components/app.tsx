"use client"

import { useSigninCheck } from "reactfire";
import Login from "@/components/login";
import Whereby from "@/components/whereby";
import Nav from "@/components/nav";
import Main from "@/components/main";

export default function App() {

  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  if (signInCheckResult.signedIn === true) {
    return (
      <div className="flex w-[1280px] h-[768px]">
        <Whereby />
        <div className="w-[768px] bg-foreground text-background relative">
          <div className="absolute top left invisible">OVERLAY</div>
          <Main />
        </div>
        <Nav />
      </div>
    );
  } else {
    return <Login />;
  }

}