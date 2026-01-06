import { Mail, User, MessageSquare } from "lucide-react";

export default function ContactCard({ contact }) {
  const createdAt = new Date(contact.created_at);
  const isNew = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60) < 24;

  return (
    <div className="bg-white text-navy rounded-2xl p-4 shadow-md flex flex-col min-w-[240px] max-w-[240px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gold" />
          <h4 className="font-semibold text-sm truncate">{contact.name}</h4>
        </div>
        {isNew && (
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold text-navy font-bold">
            Pesan Baru
          </span>
        )}
      </div>

      <p className="text-xs text-navy/70 mb-1 truncate flex items-center gap-1">
        <Mail className="w-3 h-3" /> {contact.email}
      </p>

      <p className="text-sm font-semibold mb-1 truncate">{contact.subject}</p>

      <p className="text-xs text-navy/80 line-clamp-3">
        <MessageSquare className="inline w-3 h-3 mr-1" /> {contact.message}
      </p>

      <div className="text-[10px] text-navy/50 mt-auto text-right">
        {createdAt.toLocaleString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}
