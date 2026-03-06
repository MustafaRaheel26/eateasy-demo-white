console.log('App.tsx is loading')

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChefHat,
  Users,
  Truck,
  ChevronDown,
  Instagram,
  Mail,
  Check,
  ArrowRight,
  ArrowUpRight,
  Twitter,
  Facebook,
  Linkedin,
  X,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { client } from './lib/sanityClient'
import { urlFor } from './lib/imageBuilder'

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAIL_PUBLIC_KEY);

// --- Types ---
interface Dish {
  id: string;
  name: string;
  description: string;
  image: any;
  planId: string;
  planName: string;
}

interface Plan {
  _id: string;
  name: string;
  tagline: string;
  price: string;
  priceLabel: string;
  features: string[];
  buttonText: string;
  backgroundColor: string;
  menuItems?: Dish[];
}

// --- Components ---

interface LogoProps {
  className?: string;
  variant?: "header" | "footer";
  color?: "blue" | "white";
}

const Logo = ({ className = "", variant = "header", color }: LogoProps) => {
  const sizeClass = "h-16 sm:h-20 md:h-28 w-auto object-contain";

  if (variant === "header") {
    const src = color ? `/logo-${color}.png` : "/logo-blue.png";
    return (
      <a
        href="#"
        className={`block transition-transform hover:scale-105 ${className}`}
      >
        <img
          src={src}
          alt="Eat Easy Logo"
          className={sizeClass}
          referrerPolicy="no-referrer"
        />
      </a>
    );
  }

  return (
    <a
      href="#"
      className={`block transition-transform hover:scale-105 ${className} text-current hover:text-current`}
    >
      <div
        className="h-24 md:h-28 w-auto"
        style={{
          WebkitMaskImage: `url('/logo-white.png')`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskImage: `url('/logo-white.png')`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          backgroundColor: "currentColor",
        }}
      />
    </a>
  );
};

const AdvancedHamburger = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="relative w-12 h-12 flex flex-col justify-center items-center gap-1.5 z-50 group -mr-3"
  >
    <motion.span
      animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
      className="w-8 h-0.5 bg-slate-900 block transition-transform duration-300"
    />
    <motion.span
      animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
      className="w-8 h-0.5 bg-slate-900 block transition-all duration-300"
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
      className="w-8 h-0.5 bg-slate-900 block transition-transform duration-300"
    />
  </button>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About Us", href: "#how-it-works" },
    { name: "The Menu", href: "#menu" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#subscribe" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible ${isScrolled ? "bg-white border-b-2 border-slate-900 pt-3 pb-6 sm:pt-4 sm:pb-8" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4 sm:gap-0">
        <Logo
          variant="header"
          className={`w-auto mb-1 sm:mb-2 transition-all duration-300 ${isScrolled ? "h-12 sm:h-16 md:h-20" : "h-16 sm:h-20 md:h-24"}`}
        />

        <nav className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#subscribe" className="btn-edgy px-6 py-2">
            Request Access
          </a>
        </nav>

        <div className="lg:hidden">
          <AdvancedHamburger
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-12 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-5xl font-serif text-slate-900 hover:italic transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#subscribe"
              className="btn-edgy text-xl px-12 py-6"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 md:pt-40 overflow-hidden border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-0 items-stretch">
          <div className="lg:col-span-7 py-20 lg:pr-20 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-[10px] uppercase tracking-[0.5em] font-black text-slate-400 mb-10">
                // Premium Office Catering
              </span>
              <h1 className="text-6xl md:text-[8rem] font-serif leading-[0.85] text-slate-900 mb-12 tracking-tighter">
                Chef <br />
                <span className="italic text-slate-400">Made</span> <br />
                Weekly.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-md leading-relaxed mb-16 font-medium border-l-4 border-slate-900 pl-6">
                Restaurant-quality office lunches — chef-made, delivered weekly,
                one simple price.
              </p>
              <div className="flex flex-wrap gap-10 items-center">
                <a
                  href="#subscribe"
                  className="btn-edgy group flex items-center gap-4 text-sm"
                >
                  Get Started
                  <ArrowUpRight
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </a>
                <a
                  href="#menu"
                  className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-900 border-b-2 border-slate-900 pb-1 hover:bg-slate-900 hover:text-white transition-all"
                >
                  Explore Menu
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative border-l-0 lg:border-l-2 border-slate-900 hidden md:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="h-full w-full transition-all duration-1000"
            >
              <img
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200"
                alt="Gourmet dish"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-10 right-10 bg-white border-2 border-slate-900 p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-[10px] font-black tracking-widest uppercase">
                  New Menu
                </div>
                <div className="text-2xl font-serif italic">Spring '24</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "CURATION",
      description: "Weekly rotating menus curated by executive chefs.",
    },
    {
      num: "02",
      title: "VERIFICATION",
      description: "Confirm your office location (teams 10+ only).",
    },
    {
      num: "03",
      title: "DELIVERY",
      description: "White-glove delivery straight to your floor.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-32 bg-white border-b-2 border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-5xl md:text-6xl font-serif text-slate-900 mb-10 leading-none">
              About <br />
              Us.
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed uppercase text-[11px] tracking-widest">
              We provide monthly office lunch plans delivered across the Lower
              Mainland.
            </p>
          </div>
          <div className="lg:col-span-8 grid md:grid-cols-3 gap-0 border-2 border-slate-900">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`p-10 flex flex-col justify-between min-h-[300px] ${idx !== 2 ? "border-b-2 md:border-b-0 md:border-r-2 border-slate-900" : ""} hover:bg-slate-50 transition-colors`}
              >
                <span className="font-mono text-6xl text-slate-100 font-black">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-xs font-black tracking-[0.3em] text-slate-900 mb-4 uppercase">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DishCard = ({
  dish,
  onClick,
}: {
  dish: Dish;
  onClick: () => void;
  key?: React.Key;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ x: 10, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group cursor-pointer border-2 border-slate-900 p-4 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
  >
    <div className="relative aspect-square overflow-hidden mb-6 border-2 border-slate-900">
      <img
        src={urlFor(dish.image).url()}
        alt={dish.name}
        className="w-full h-full object-cover transition-all duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
    <h4 className="text-2xl font-serif text-slate-900 mb-2">{dish.name}</h4>
    <div className="flex items-center justify-between">
      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
        Chef Selection
      </p>
      <ArrowUpRight
        size={16}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  </motion.div>
);

const DishModal = ({ dish, onClose }: { dish: Dish; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-white/90 backdrop-blur-sm overflow-y-auto"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      className="bg-white border-2 sm:border-4 border-slate-900 p-4 sm:p-8 md:p-12 max-w-4xl w-full relative shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] my-8"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 text-slate-900 hover:rotate-90 transition-transform duration-300 bg-white border border-slate-900 p-1 sm:p-2 z-10"
      >
        <X size={24} className="sm:w-8 sm:h-8" />
      </button>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start md:items-center">
        <div className="border-2 sm:border-4 border-slate-900 aspect-square overflow-hidden">
          <img
            src={urlFor(dish.image).url()}
            alt={dish.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="pt-4 sm:pt-0">
          <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-black text-slate-400 mb-2 sm:mb-4 block">
            // Premium Selection
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif text-slate-900 mb-4 sm:mb-8 leading-tight">
            {dish.name}
          </h2>
          <p className="text-xs sm:text-sm md:text-lg text-slate-600 mb-6 sm:mb-10 leading-relaxed font-medium border-l-2 sm:border-l-4 border-slate-900 pl-3 sm:pl-6">
            {dish.description} This dish is prepared fresh daily using locally
            sourced ingredients, ensuring a restaurant-quality experience right
            in your office.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-6">
            <div className="px-2 sm:px-4 py-1 sm:py-2 border border-slate-900 sm:border-2 font-black text-[7px] sm:text-[10px] uppercase tracking-widest">
              Fresh Daily
            </div>
            <div className="px-2 sm:px-4 py-1 sm:py-2 border border-slate-900 sm:border-2 font-black text-[7px] sm:text-[10px] uppercase tracking-widest">
              Chef Curated
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const MenuSection = () => {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [menuItems, setMenuItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all plans
        const plansData = await client.fetch(`
          *[_type == "plan"] | order(name asc) {
            _id,
            name,
            tagline,
            price,
            priceLabel,
            features,
            buttonText,
            backgroundColor
          }
        `);
        
        // Fetch all menu items with their plan reference
        const menuData = await client.fetch(`
          *[_type == "menuItem"] {
            _id,
            name,
            description,
            image,
            plan->{
              _id,
              name
            }
          }
        `);
        
        // Transform menu items to include plan info
        const transformedMenuItems = menuData.map((item: any) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          image: item.image,
          planId: item.plan?._id,
          planName: item.plan?.name
        }));
        
        setPlans(plansData);
        setMenuItems(transformedMenuItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="menu" className="py-32 bg-white border-b-2 border-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          Loading menu...
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-32 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-400 mb-6 block">
              // Seasonal Selection
            </span>
            <h2 className="text-6xl md:text-8xl font-serif text-slate-900 leading-none">
              The <br />
              Menu.
            </h2>
          </div>
          <p className="text-slate-900 font-black uppercase text-[10px] tracking-[0.3em] max-w-xs leading-relaxed border-2 border-slate-900 p-6">
            Our menus evolve with the seasons, ensuring the freshest ingredients
            reach your desk.
          </p>
        </div>

        <div className="space-y-40">
          {plans.map((plan) => {
            const planMenuItems = menuItems.filter(item => item.planId === plan._id);
            
            if (planMenuItems.length === 0) return null;
            
            return (
              <div key={plan._id}>
                <div className="flex items-center gap-10 mb-16">
                  <h3 className="text-4xl font-serif text-slate-900">
                    {plan.name}
                  </h3>
                  <div className="h-1 flex-grow bg-slate-900" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
                  {planMenuItems.map((dish) => (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      onClick={() => setSelectedDish(dish)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedDish && (
          <DishModal
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const data = await client.fetch(`
          *[_type == "plan"] | order(name asc) {
            _id,
            name,
            tagline,
            price,
            priceLabel,
            features,
            buttonText,
            backgroundColor
          }
        `);
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section id="pricing" className="py-32 bg-white border-b-2 border-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          Loading plans...
        </div>
      </section>
    );
  }

  return (
    <section
      id="pricing"
      className="py-32 bg-white border-b-2 border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-0 border-2 border-slate-900">
          {plans.map((plan, index) => (
            <motion.div
              key={plan._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className={`p-8 sm:p-12 md:p-16 ${
                index === 0 && plans.length > 1 ? 'border-b-2 lg:border-b-0 lg:border-r-2 border-slate-900' : ''
              } ${
                plan.backgroundColor === 'dark' 
                  ? 'bg-slate-900 text-white hover:bg-black' 
                  : 'hover:bg-slate-50'
              } transition-all`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-16 gap-8">
                <div>
                  <h3 className={`text-3xl sm:text-4xl font-serif mb-4 whitespace-nowrap ${
                    plan.backgroundColor === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-[10px] uppercase tracking-widest font-black ${
                    plan.backgroundColor === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {plan.tagline}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-4xl sm:text-5xl font-serif ${
                    plan.backgroundColor === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {plan.price}
                  </span>
                  <p className={`text-[10px] uppercase font-black tracking-widest ${
                    plan.backgroundColor === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {plan.priceLabel}
                  </p>
                </div>
              </div>
              <ul className="space-y-8 mb-16">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-6 text-xs font-bold uppercase tracking-widest ${
                      plan.backgroundColor === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    <div className={`w-2 h-2 ${
                      plan.backgroundColor === 'dark' ? 'bg-white' : 'bg-slate-900'
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#subscribe"
                className={`${
                  plan.backgroundColor === 'dark'
                    ? 'px-8 py-5 font-black uppercase tracking-[0.3em] transition-all duration-300 bg-white text-slate-900 hover:bg-slate-200 w-full text-center block text-sm border-2 border-white'
                    : 'btn-edgy w-full text-center block text-sm py-5'
                }`}
              >
                {plan.buttonText}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SubscriptionForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });
  const [formData, setFormData] = useState({
    contact_name: "",
    office_name: "",
    work_email: "",
    phone: "",
    team_size: "",
    preferred_plan: "",
    message: "",
  });

  useEffect(() => {
    async function fetchPlans() {
      try {
        const data = await client.fetch(`
          *[_type == "plan"] | order(name asc) {
            _id,
            name,
            price
          }
        `);
        setPlans(data);
        if (data.length > 0) {
          setFormData(prev => ({
            ...prev,
            preferred_plan: `${data[0].name} ${data[0].price}`
          }));
        }
      } catch (error) {
        console.error('Error fetching plans for form:', error);
      }
    }
    fetchPlans();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.contact_name ||
      !formData.work_email ||
      !formData.office_name ||
      !formData.phone ||
      !formData.team_size ||
      !formData.preferred_plan
    ) {
      setFormStatus({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    setFormStatus({
      type: "loading",
      message: "Sending your subscription request...",
    });

    try {
      if (!formRef.current) {
        throw new Error("Form reference not found");
      }

      const response = await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY,
      );

      if (response.status === 200) {
        setFormStatus({
          type: "success",
          message: "Subscription request sent successfully!",
        });

        setFormData({
          contact_name: "",
          office_name: "",
          work_email: "",
          phone: "",
          team_size: "",
          preferred_plan: plans.length > 0 ? `${plans[0].name} ${plans[0].price}` : "",
          message: "",
        });

        if (formRef.current) {
          formRef.current.reset();
        }

        setTimeout(() => {
          setFormStatus({
            type: "idle",
            message: "",
          });
        }, 5000);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send subscription request. Please try again.",
      });

      setTimeout(() => {
        setFormStatus({
          type: "idle",
          message: "",
        });
      }, 5000);
    }
  };

  return (
    <section
      id="subscribe"
      className="py-32 bg-white border-b-2 border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-400 mb-10 block">
              // Join the Circle
            </span>
            <h2 className="text-6xl md:text-8xl font-serif text-slate-900 mb-12 leading-none">
              Request <br />
              Access.
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-16 border-l-4 border-slate-900 pl-8">
              We are currently accepting a limited number of new office
              subscriptions to maintain our standard of service.
            </p>
            <div className="space-y-16">
              <div className="flex gap-10">
                <div className="text-slate-900 font-mono text-4xl font-black">
                  01
                </div>
                <div>
                  <h4 className="font-black tracking-widest uppercase text-xs text-slate-900 mb-4">
                    Concierge Setup
                  </h4>
                  <p className="text-sm text-slate-500 font-medium">
                    Personalized onboarding for your entire team.
                  </p>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="text-slate-900 font-mono text-4xl font-black">
                  02
                </div>
                <div>
                  <h4 className="font-black tracking-widest uppercase text-xs text-slate-900 mb-4">
                    Flexible Scaling
                  </h4>
                  <p className="text-sm text-slate-500 font-medium">
                    Adjust your volume as your team grows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 card-edgy">
            {formStatus.type !== "idle" && (
              <div
                className={`p-6 mb-6 border-l-4 ${
                  formStatus.type === "success"
                    ? "bg-emerald-50 border-emerald-500"
                    : formStatus.type === "error"
                      ? "bg-red-50 border-red-500"
                      : "bg-blue-50 border-blue-500"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {formStatus.type === "success" && (
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    )}
                    {formStatus.type === "error" && (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                    {formStatus.type === "loading" && (
                      <Loader className="w-6 h-6 text-blue-600 animate-spin" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-black text-sm ${
                        formStatus.type === "success"
                          ? "text-emerald-900"
                          : formStatus.type === "error"
                            ? "text-red-900"
                            : "text-blue-900"
                      }`}
                    >
                      {formStatus.type === "success"
                        ? "Success!"
                        : formStatus.type === "error"
                          ? "Error"
                          : "Processing..."}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        formStatus.type === "success"
                          ? "text-emerald-700"
                          : formStatus.type === "error"
                            ? "text-red-700"
                            : "text-blue-700"
                      }`}
                    >
                      {formStatus.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-12"
            >
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contact_name"
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.contact_name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Office Name
                </label>
                <input
                  type="text"
                  name="office_name"
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.office_name}
                  onChange={handleInputChange}
                  placeholder="Your Company"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Work Email
                </label>
                <input
                  type="email"
                  name="work_email"
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.work_email}
                  onChange={handleInputChange}
                  placeholder="john@company.com"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Team Size
                </label>
                <input
                  type="number"
                  name="team_size"
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.team_size}
                  onChange={handleInputChange}
                  placeholder="50"
                  min="1"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Preferred Plan
                </label>
                <div className="relative group">
                  <select
                    name="preferred_plan"
                    className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900 appearance-none cursor-pointer pr-10"
                    value={formData.preferred_plan}
                    onChange={handleInputChange}
                    required
                  >
                    {plans.map((plan) => (
                      <option key={plan._id} value={`${plan.name} ${plan.price}`}>
                        {plan.name} - {plan.price}/meal
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none group-hover:translate-y-[-40%] transition-transform">
                    <ChevronDown size={18} className="text-slate-900" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Message <span className="text-slate-300">(Optional)</span>
                </label>
                <textarea
                  name="message"
                  rows={2}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your preferences..."
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-10">
                <button
                  type="submit"
                  disabled={formStatus.type === "loading"}
                  className={`btn-edgy w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    formStatus.type === "loading" ? "opacity-50" : ""
                  }`}
                >
                  {formStatus.type === "loading" ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "What is included and how often are meals delivered?",
      a: "Chef-made meal, eco-friendly packaging, twice-weekly delivery (Monday & Wednesday) — no hidden fees.",
    },
    {
      q: "What’s the difference between the plans?",
      a: "Vegetarian ($16.49/meal): vegetarian options. With Protein ($18.99/meal): includes premium meats/proteins.",
    },
    {
      q: "How do we cancel or change the monthly plan?",
      a: "Give one week’s notice — email us to cancel or adjust.",
    },
    {
      q: "Are the menus the same every week?",
      a: "Yes — consistent weekly menus, with possible monthly updates based on team reviews or email voting.",
    },
    {
      q: "How does monthly subscription billing work?",
      a: "Billed monthly for ~20 meals per person (5 meals/week: 2 on Monday, 3 on Wednesday). Plant Based $329.80/person/month + tax, Signature $379.80/person/month + tax.",
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="text-6xl font-serif text-slate-900 mb-20 text-center leading-none">
          Common <br />
          Questions.
        </h2>
        <div className="space-y-0 border-2 border-slate-900">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`${idx !== faqs.length - 1 ? "border-b-2 border-slate-900" : ""}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-8 text-left flex items-center justify-between group hover:bg-slate-50 transition-colors"
              >
                <span className="text-xl font-serif text-slate-900">
                  {faq.q}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-slate-900 transition-transform duration-500 ${openIdx === idx ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-slate-500 font-medium leading-relaxed uppercase text-[11px] tracking-widest">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 sm:py-24 bg-slate-900 text-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col gap-10 md:gap-16">
          <div className="flex items-center justify-center md:justify-start">
            <div className="text-center md:text-left">
              <Logo
                variant="footer"
                className="text-slate-500 w-24 sm:w-28 md:w-32 h-auto mx-auto md:mx-0"
              />
              <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.6em] text-slate-500 mt-4 font-black">
                Work hard lunch easy
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-8 md:gap-10">
            <div className="flex gap-12">
              <a
                href="https://instagram.com/eateasycanada"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-all transform hover:scale-125"
              >
                <Instagram size={24} />
              </a>
              <a
                href="mailto:info@eateasycanada.com"
                className="text-slate-500 hover:text-white transition-all transform hover:scale-125"
              >
                <Mail size={24} />
              </a>
            </div>
            <p className="text-[10px] text-slate-600 font-black tracking-widest uppercase">
              © 2024 EAT EASY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <MenuSection />
        <Pricing />
        <SubscriptionForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}