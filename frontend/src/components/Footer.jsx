
// eslint-disable-next-line react/prop-types
const Footer = ({ theme }) => {
    
  return (
    <footer className={`bg-${theme === "dark" ? "indigo-900" : "indigo-500"} text-white py-6`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
