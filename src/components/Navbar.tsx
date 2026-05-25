import React, { useEffect, useState, Children } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
type NavChild = {
  name: string;
  path: string;
};
type NavLink = {
  name: string;
  path: string;
  children?: NavChild[];
};
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenMobileSub(null);
  }, [location.pathname]);
  const navLinks: NavLink[] = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/'
  },
  {
    name: 'Services',
    path: '/services',
    children: [
    {
      name: 'Hybrid Solar System',
      path: '/services'
    },
    {
      name: 'CCTV & Surveillance',
      path: '/services'
    },
    {
      name: 'Mini Grid Solution',
      path: '/services'
    },
    {
      name: 'Project Management & Partnership',
      path: '/services'
    },
    {
      name: 'Equipment Sales, Supply & Installation',
      path: '/services'
    }]

  },
  {
    name: 'Shop',
    path: '/shop',
    children: [
    {
      name: 'Hybrid Solar System',
      path: '/shop/hybrid-solar-system'
    },
    {
      name: 'Protection devices',
      path: '/shop/protection-devices'
    },
    {
      name: 'Accessories',
      path: '/shop/accessories'
    }]

  },
  {
    name: 'Academy',
    path: '/academy',
    children: [
    {
      name: 'Solar Installation Track',
      path: '/academy'
    },
    {
      name: 'Inverter & Battery Workshop',
      path: '/academy'
    },
    {
      name: 'Certification Programs',
      path: '/academy'
    },
    {
      name: 'Corporate Capacity Building',
      path: '/academy'
    }]

  },
  {
    name: 'Blog',
    path: '/blog'
  },
  {
    name: 'Contact',
    path: '/'
  }];

  const isActive = (link: NavLink) => {
    if (link.name === 'Home') return location.pathname === '/';
    return location.pathname === link.path && link.path !== '/';
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-3'}`}>
      
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center group rounded-xl border-2 border-slate-100 bg-white px-2 py-1 shadow-sm hover:border-secondary hover:shadow-md transition-all duration-300">
          
          <img
            src="/IMG_1599.JPG.jpg"
            alt="Embrace Technologies"
            className="h-12 md:h-14 w-36 md:w-44 object-contain transition-transform duration-300 group-hover:scale-105" />
          
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const hasChildren = !!link.children?.length;
            const active = isActive(link);
            if (!hasChildren) {
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-montserrat font-medium text-sm transition-colors hover:text-secondary ${active ? 'text-secondary' : 'text-primary'}`}>
                  
                  {link.name}
                </Link>);

            }
            return (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}>
                
                <button
                  type="button"
                  onClick={() =>
                  setOpenDropdown(
                    openDropdown === link.name ? null : link.name
                  )
                  }
                  className={`flex items-center gap-1 font-montserrat font-medium text-sm transition-colors hover:text-secondary ${active ? 'text-secondary' : 'text-primary'}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === link.name}>
                  
                  {link.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                  
                </button>

                <AnimatePresence>
                  {openDropdown === link.name &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: 8
                    }}
                    transition={{
                      duration: 0.18
                    }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                    
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="h-1 bg-secondary" />
                        <ul className="py-2">
                          {link.children!.map((child) =>
                        <li key={child.name}>
                              <Link
                            to={child.path}
                            className="block px-5 py-3 font-montserrat text-sm text-primary hover:bg-slate-50 hover:text-secondary transition-colors">
                            
                                {child.name}
                              </Link>
                            </li>
                        )}
                        </ul>
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
              </div>);

          })}

          <Link
            to="/"
            className="bg-secondary text-primary font-bold font-poppins px-6 py-2.5 rounded-sm hover:bg-yellow-400 transition-colors shadow-sm">
            
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-primary p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu">
          
          {isMobileMenuOpen ?
          <X className="w-6 h-6" /> :

          <Menu className="w-6 h-6" />
          }
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="lg:hidden bg-white border-t border-slate-100 overflow-hidden">
          
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
              const hasChildren = !!link.children?.length;
              if (!hasChildren) {
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="font-montserrat font-medium text-lg text-primary py-3 border-b border-slate-50">
                    
                      {link.name}
                    </Link>);

              }
              const isOpen = openMobileSub === link.name;
              return (
                <div key={link.name} className="border-b border-slate-50">
                    <button
                    type="button"
                    onClick={() =>
                    setOpenMobileSub(isOpen ? null : link.name)
                    }
                    className="w-full flex items-center justify-between font-montserrat font-medium text-lg text-primary py-3"
                    aria-expanded={isOpen}>
                    
                      <span>{link.name}</span>
                      <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    
                    </button>
                    <AnimatePresence>
                      {isOpen &&
                    <motion.ul
                      initial={{
                        height: 0,
                        opacity: 0
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1
                      }}
                      exit={{
                        height: 0,
                        opacity: 0
                      }}
                      transition={{
                        duration: 0.2
                      }}
                      className="overflow-hidden pl-4 border-l-2 border-secondary ml-1 mb-3">
                      
                          {link.children!.map((child) =>
                      <li key={child.name}>
                              <Link
                          to={child.path}
                          className="block font-montserrat text-sm text-slate-600 py-2 hover:text-secondary transition-colors">
                          
                                {child.name}
                              </Link>
                            </li>
                      )}
                        </motion.ul>
                    }
                    </AnimatePresence>
                  </div>);

            })}

              <Link
              to="/"
              className="bg-secondary text-primary font-bold font-poppins px-6 py-3 rounded-sm text-center mt-4">
              
                Get a Quote
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}