const Footer = () => {
  return (
    <footer className="w-full bg-purple-700 text-white py-3 text-center text-sm font-medium shadow-inner">
      © {new Date().getFullYear()} I AM CHEF —  
      <a
        href="https://github.com/SimoAlbi28/iamchef-albini"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-300 hover:text-white ml-1 underline"
      >
        GitHub
      </a>
    </footer>
  );
}

export default Footer;
