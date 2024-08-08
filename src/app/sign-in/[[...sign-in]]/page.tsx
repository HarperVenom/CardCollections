import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="w-screen flex-grow flex justify-center items-center z-[0]">
      <SignIn></SignIn>
    </div>
  );
}
