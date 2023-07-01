"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/stores/authContext";

export default function Navbar() {
  const { user, authReady, login, logout } = useAuthContext();

  return (
    <div className="container">
      <nav>
        <Image src="/rupee.png" width={50} height={48} alt="gaming vibes" />
        <h1>Gaming Vibes</h1>
        {authReady && (
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/guides">Guides</Link>
            </li>
            {user && <li>{user.email}</li>}
            <li onClick={user ? logout : login} className="btn">
              {user ? "Logout" : "Login/Signup"}
            </li>
          </ul>
        )}
      </nav>
      <div className="banner">
        <Image src="/banner.png" width={966} height={276} alt="gaming vibes" />
      </div>
    </div>
  );
}
