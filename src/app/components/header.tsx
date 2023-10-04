import Image from "next/image";

function Header() {
  return (
    <header className="bg-white/20 py-4">
      <p className="custom-flex">
        <Image
          className="mix-blend-multipply"
          src="/logoProject.png"
          width={80}
          height={80}
          alt=""
        />
        <a
          className=" uppercase text-logo text-white font-semibold text-lg"
          href="https://brayanccari.vercel.app/"
          target="_blank"
        >
          brayanccari.com
        </a>
      </p>
    </header>
  );
}

export default Header;
