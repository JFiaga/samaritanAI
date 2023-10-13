import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      <p>Landing Page (unprotected)</p>
      <div className="flex space-x-4 px-4">
        <Link href={"/sign-in"}>
          <Button>Login</Button>
        </Link>

        <Link href={"/sign-up"}>
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
