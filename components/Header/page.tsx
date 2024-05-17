export default function Page() {
    return (
        <header id="home" className="sticky top-0 w-full z-50">
            <nav className="flex items-center bg-white shadow h-16">
                <div className="container__main flex items-center">
                    <a href="#home" className="mr-auto text-xl font-semibold text-sky-500"
                    >HeLLo.
                    </a>
                    <button className="text-lg ml-5 mt-2 md:hidden">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <ul className="md:flex items-center gap-7 text-sm hidden">
                        <li>
                            <a href="#home" className="hover:text-sky-500 transition-colors"
                            >Home</a>
                        </li>
                        <li>
                            <a href="#about" className="hover:text-sky-500 transition-colors"
                            >About Us</a>
                        </li>
                        <li>
                            <a href="#services" className="hover:text-sky-500 transition-colors"
                            >Services</a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-sky-500 transition-colors"
                            >Contact Us</a>
                        </li>
                        <button className="rounded__btn rounded-3xl ml-3">Get Started</button>
                    </ul>
                </div>
            </nav>
        </header>
    )
}