export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 py-16 px-8 relative z-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-zyroRed to-goldAccent bg-clip-text text-transparent mb-4">ZYRO</h3>
          <p className="text-gray-400">Zero Sugar Masala Cola. The spicy revolution.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-zyroRed transition-colors">Shop</a></li>
            <li><a href="#" className="hover:text-zyroRed transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-zyroRed transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <form className="flex gap-2">
            <input type="email" placeholder="Enter email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:border-zyroRed transition-colors text-white" />
            <button type="button" className="bg-zyroRed hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Zyro Cola. All rights reserved.
      </div>
    </footer>
  );
}
