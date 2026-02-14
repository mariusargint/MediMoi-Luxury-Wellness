
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-24 border-t border-medimoi-black/5 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div className="space-y-8">
          <h3 className="font-serif text-3xl tracking-widest lowercase">Medimoi<span className="text-medimoi-gold">.</span></h3>
          <p className="text-[12px] text-neutral-500 leading-relaxed uppercase tracking-widest">
            Premier In-Home Healthcare <br />
            & Wellness Services <br />
            London, United Kingdom
          </p>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Treatments</h4>
          <ul className="space-y-4 text-[12px] text-neutral-500 uppercase tracking-widest">
            <li><a href="#" className="hover:text-medimoi-gold">Massages</a></li>
            <li><a href="#" className="hover:text-medimoi-gold">IV Drips</a></li>
            <li><a href="#" className="hover:text-medimoi-gold">Aesthetics</a></li>
            <li><a href="#" className="hover:text-medimoi-gold">Physiotherapy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Company</h4>
          <ul className="space-y-4 text-[12px] text-neutral-500 uppercase tracking-widest">
            <li><a href="#" className="hover:text-medimoi-gold">How it works</a></li>
            <li><a href="#" className="hover:text-medimoi-gold">Our Experts</a></li>
            <li><a href="#" className="hover:text-medimoi-gold">Careers</a></li>
            <li><a href="#" className="hover:text-medimoi-gold">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Newsletter</h4>
          <p className="text-[12px] text-neutral-500 uppercase tracking-widest mb-6 leading-relaxed">
            Join the elite circle for <br /> exclusive wellness updates.
          </p>
          <div className="flex border-b border-medimoi-black/10 py-2">
            <input type="email" placeholder="YOUR EMAIL" className="bg-transparent w-full text-[10px] tracking-widest focus:outline-none" />
            <button className="text-[10px] tracking-[0.2em] font-bold">JOIN</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-medimoi-black/5 flex flex-col md:flex-row justify-between text-[10px] text-neutral-400 tracking-[0.2em] uppercase">
        <p>© 2024 MEDIMOI LTD. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
