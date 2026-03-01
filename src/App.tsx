import React, { useState, useEffect } from "react";
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
} from "lucide-react";

// --- Types ---
interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
}

// --- Components ---

interface LogoProps {
  className?: string;
  variant?: "header" | "footer";
  // explicit color override; if omitted we fall back to the variant default
  color?: "blue" | "white";
}

const Logo = ({ className = "", variant = "header", color }: LogoProps) => {
  const sizeClass = "h-24 md:h-28 w-auto object-contain";

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

  // footer uses white logo as mask so color can be applied via text-* utilities
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
    className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 group"
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white border-b-2 border-slate-900 py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* add a little extra top padding so the logo isn't pressed against the edge */}
        <Logo variant="header" className="pt-2" />

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
    whileHover={{ x: 10 }}
    onClick={onClick}
    className="group cursor-pointer border-2 border-slate-900 p-4 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
  >
    <div className="relative aspect-square overflow-hidden mb-6 border-2 border-slate-900">
      <img
        src={dish.image}
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
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/90 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      className="bg-white border-4 border-slate-900 p-8 md:p-12 max-w-4xl w-full relative shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-slate-900 hover:rotate-90 transition-transform duration-300"
      >
        <X size={32} />
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="border-4 border-slate-900 aspect-square overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-400 mb-4 block">
            // Premium Selection
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 leading-none">
            {dish.name}
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium border-l-4 border-slate-900 pl-6">
            {dish.description} This dish is prepared fresh daily using locally
            sourced ingredients, ensuring a restaurant-quality experience right
            in your office.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="px-4 py-2 border-2 border-slate-900 font-black text-[10px] uppercase tracking-widest">
              Fresh Daily
            </div>
            <div className="px-4 py-2 border-2 border-slate-900 font-black text-[10px] uppercase tracking-widest">
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

  const plantBased: Dish[] = [
    {
      id: 1,
      name: "Quinoa Harvest",
      description: "Roasted sweet potatoes, kale, chickpeas.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      name: "Mushroom Risotto",
      description: "Creamy arborio rice with wild mushrooms.",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 3,
      name: "Thai Green Curry",
      description: "Spicy coconut curry with vegetables.",
      image:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 4,
      name: "Lentil Shepherd",
      description: "Hearty lentils with sweet potato mash.",
      image:
        "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 5,
      name: "Zucchini Noodles",
      description: "Fresh zoodles with basil pesto.",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const signature: Dish[] = [
    {
      id: 6,
      name: "Pan-Seared Salmon",
      description: "Atlantic salmon with asparagus.",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 7,
      name: "Beef Short Rib",
      description: "Slow-cooked beef with creamy polenta.",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 8,
      name: "Chicken Saltimbocca",
      description: "Prosciutto-wrapped chicken.",
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 9,
      name: "Truffle Pasta",
      description: "Handmade fettuccine with truffle.",
      image:
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 10,
      name: "Grilled Lamb",
      description: "Herb-crusted lamb with root vegetables.",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600",
    },
  ];

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
          <div>
            <div className="flex items-center gap-10 mb-16">
              <h3 className="text-4xl font-serif text-slate-900">
                Plant Based
              </h3>
              <div className="h-1 flex-grow bg-slate-900" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {plantBased.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onClick={() => setSelectedDish(dish)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-10 mb-16">
              <h3 className="text-4xl font-serif text-slate-900">Signature</h3>
              <div className="h-1 flex-grow bg-slate-900" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {signature.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onClick={() => setSelectedDish(dish)}
                />
              ))}
            </div>
          </div>
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
  return (
    <section
      id="pricing"
      className="py-32 bg-white border-b-2 border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-0 border-2 border-slate-900">
          <div className="p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-slate-900 hover:bg-slate-50 transition-all">
            <div className="flex justify-between items-start mb-16">
              <div>
                <h3 className="text-4xl font-serif text-slate-900 mb-4">
                  Plant Based
                </h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
                  The Conscious Choice
                </p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-serif text-slate-900">
                  $16.49
                </span>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                  Per Meal
                </p>
              </div>
            </div>
            <ul className="space-y-8 mb-16">
              {[
                "Vegetarian meal options",
                "Chef-curated special recipes",
                "Eco-friendly packaging",
                "Consistent weekly menus",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-600"
                >
                  <div className="w-2 h-2 bg-slate-900" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#subscribe"
              className="btn-edgy w-full text-center block text-sm py-5"
            >
              Select Plan
            </a>
          </div>

          <div className="p-16 bg-slate-900 text-white hover:bg-black transition-all">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-16 gap-8">
              <div>
                <h3 className="text-4xl font-serif mb-4 whitespace-nowrap">
                  Signature
                </h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
                  The Executive Choice
                </p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-serif">$18.99</span>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                  Per Meal
                </p>
              </div>
            </div>
            <ul className="space-y-8 mb-16">
              {[
                "Premium proteins included",
                "Chef-curated special recipes",
                "Eco-friendly packaging",
                "Consistent weekly menus",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400"
                >
                  <div className="w-2 h-2 bg-white" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#subscribe"
              className="px-8 py-5 font-black uppercase tracking-[0.3em] transition-all duration-300 bg-white text-slate-900 hover:bg-slate-200 w-full text-center block text-sm border-2 border-white"
            >
              Select Plan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({
    officeName: "",
    contactName: "",
    email: "",
    phone: "",
    employees: "",
    plan: "signature",
    message: "",
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(formData.employees) < 10) {
      setError("Minimum 10 employees required.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="subscribe" className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-edgy p-20"
          >
            <h2 className="text-5xl font-serif text-slate-900 mb-10">
              Inquiry Received.
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-12 leading-loose">
              Our concierge will contact you within 24 hours to discuss your
              office's specific requirements.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-900 border-b-4 border-slate-900 pb-2"
            >
              Back to form
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

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
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-12"
            >
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Office Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.officeName}
                  onChange={(e) =>
                    setFormData({ ...formData, officeName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Contact Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Work Email
                </label>
                <input
                  required
                  type="email"
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Team Size
                </label>
                <input
                  required
                  type="number"
                  className={`w-full bg-transparent border-b-2 ${error ? "border-red-500" : "border-slate-200"} py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900`}
                  value={formData.employees}
                  onChange={(e) =>
                    setFormData({ ...formData, employees: e.target.value })
                  }
                />
                {error && (
                  <p className="text-[10px] text-red-500 font-black mt-2">
                    {error}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Preferred Plan
                </label>
                <div className="relative group">
                  <select
                    className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900 appearance-none cursor-pointer pr-10"
                    value={formData.plan}
                    onChange={(e) =>
                      setFormData({ ...formData, plan: e.target.value })
                    }
                  >
                    <option value="signature">Signature Plan</option>
                    <option value="plant-based">Plant Based Plan</option>
                    <option value="custom">Custom / Mixed Plan</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none group-hover:translate-y-[-40%] transition-transform">
                    <ChevronDown size={18} className="text-slate-900" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                  Message
                </label>
                <textarea
                  rows={2}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 focus:border-slate-900 outline-none transition-colors font-bold text-slate-900"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="md:col-span-2 pt-10">
                <button type="submit" className="btn-edgy w-full text-sm">
                  Submit Inquiry
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
    <footer className="py-24 bg-slate-900 text-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="text-center md:text-left">
            <Logo variant="footer" className="text-slate-500" />
            <p className="text-[10px] uppercase tracking-[0.6em] text-slate-500 mt-6 font-black">
              Work hard lunch easy
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-10">
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
