import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="w-screen flex-grow flex justify-center items-center z-[0]">
      <SignUp></SignUp>
    </div>
  );
}
