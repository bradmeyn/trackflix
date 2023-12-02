import logo from "../.././public/logo.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="items-center p-5 text-slate-400 ">
      <div className="text-center">
        <Image src={logo} alt="Watchflix logo" className="mx-auto mb-2 w-20" />

        <p className=" mb-2 flex items-center justify-center text-sm">
          <span className="mr-2">Developed by</span>
          <a
            href={"https://www.bradmeyn.com"}
            target="_blank"
            rel="noreferrer"
            className="text-white underline-offset-2 hover:underline"
          >
            Brad Meyn
          </a>
          <span className="px-2">&#8226;</span>
          <a
            href={"https://www.github.com/bradmeyn/watchflix"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center text-sm text-white underline-offset-2 hover:underline"
          >
            <FontAwesomeIcon icon={faGithub} className="mr-2 " />{" "}
            <span>GitHub</span>
          </a>
        </p>

        <p className="text-xs">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
