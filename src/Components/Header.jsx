function Header() {
  return (
    <header className="flex gap-3 w-full justify-center items-center  py-5">
      <img
        src="src/assets/react.svg "
        className=" sm:w-20 h-10  w-10 md:w-16 md:h-16  xs:w-14 xs:h-14 "
        alt="React logo"
      />
      <h1 className="text-2xl font-bungee md:text-5xl sm:text-4xl lg:text-7xl">
        The React Quiz
      </h1>
    </header>
  );
}

export default Header;
