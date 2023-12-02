import logo from "../.././public/logo.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/pro-light-svg-icons";
import SearchModal from "../Search/SearchModal";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-slate-900 p-3  ">
      <div className="container mx-auto flex w-full items-center justify-between md:justify-between">
        <div className="flex items-center">
          <Link href={"/"}>
            <Image src={logo} alt="" className="w-24 md:w-32" />
          </Link>
          <Link
            href={"/"}
            className={`text-md ml-7 font-semibold hover:text-white ${
              router.pathname === "/" ? " text-white " : " text-slate-400 "
            }`}
          >
            Home
          </Link>
          <Link
            href={"/movies"}
            className={`text-md ml-7 font-semibold hover:text-white ${
              router.pathname === "/movies"
                ? " text-white "
                : " text-slate-400 "
            }`}
          >
            Discover
          </Link>
        </div>

        <SearchModal />
        <a className="flex items-center align-middle hover:text-white">
          <FontAwesomeIcon icon={faCircleUser} className="mr-2  text-xl" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
