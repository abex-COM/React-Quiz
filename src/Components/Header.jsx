function Header() {
  return (
    <header className="flex gap-2 w-full justify-center items-center  py-5">
      <img
        src="/islamic.png "
        className=" sm:w-20 h-10  w-10 md:w-14 md:h-14  xs:w-12 xs:h-12 "
        alt="React logo"
      />
      <h1 className="text-xl font-bungee md:text-4xl sm:text-3xl lg:text-5xl">
        The Islamic Basic Question s
      </h1>
      <h3 className="text-xs text-slate-300 w-20 first-letter:text-lg first-letter:text-yellow-400">
        Prepared by Abdulhaq
      </h3>
    </header>
  );
}

export default Header;
