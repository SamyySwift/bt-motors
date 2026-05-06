import { Phone, MessageSquare, Mail } from "lucide-react";
import MagneticButton from "./MagneticButton";

const CONTACT_INFO = {
  phone: "09162228881",
  whatsapp: "2349162228881", // Assuming Nigerian country code for 0916
  email: "info@beeteeautomobile.com",
};

export default function ContactOptions() {
  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <MagneticButton>
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex items-center gap-4 w-full p-6 bg-bt-blue text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-bt-blue-dark transition-all shadow-xl interactive"
          data-cursor-text="Call Now"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Phone size={18} />
          </div>
          <span>Call via Phone</span>
        </a>
      </MagneticButton>

      <MagneticButton>
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 w-full p-6 bg-emerald-500 text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-xl interactive"
          data-cursor-text="WhatsApp"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare size={18} />
          </div>
          <span>Text on WhatsApp</span>
        </a>
      </MagneticButton>

      <MagneticButton>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex items-center gap-4 w-full p-6 bg-apple-black text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl interactive"
          data-cursor-text="Email"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Mail size={18} />
          </div>
          <span>Send an Email</span>
        </a>
      </MagneticButton>
    </div>
  );
}
