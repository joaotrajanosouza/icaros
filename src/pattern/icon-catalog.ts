import {
  Link2,
  Instagram,
  Youtube,
  MessageCircle,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Store,
  Mail,
  Phone,
  MapPin,
  Calendar,
  QrCode,
  Download,
  Briefcase,
  GraduationCap,
  Users,
  Mic2,
  Video,
  Music,
  FileText,
  Ticket,
  Package,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type IconOption = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const iconCatalog: IconOption[] = [
  { id: "link", label: "Link genérico", icon: Link2 },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "tiktok", label: "TikTok", icon: Video },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "twitter", label: "X/Twitter", icon: Twitter },
  { id: "github", label: "GitHub", icon: Github },
  { id: "site", label: "Site", icon: Globe },
  { id: "loja", label: "Loja", icon: Store },
  { id: "email", label: "E-mail", icon: Mail },
  { id: "telefone", label: "Telefone", icon: Phone },
  { id: "mapa", label: "Mapa/localização", icon: MapPin },
  { id: "agenda", label: "Calendário/agenda", icon: Calendar },
  { id: "pix", label: "Pix/pagamento", icon: QrCode },
  { id: "download", label: "Download", icon: Download },
  { id: "portfolio", label: "Portfólio", icon: Briefcase },
  { id: "curso", label: "Curso", icon: GraduationCap },
  { id: "comunidade", label: "Comunidade", icon: Users },
  { id: "podcast", label: "Podcast", icon: Mic2 },
  { id: "video", label: "Vídeo", icon: Video },
  { id: "musica", label: "Música", icon: Music },
  { id: "documento", label: "Documento", icon: FileText },
  { id: "cupom", label: "Cupom", icon: Ticket },
  { id: "produto", label: "Produto", icon: Package },
  { id: "servico", label: "Serviço", icon: Wrench },
];

export function getIconOption(id: string): IconOption {
  return iconCatalog.find((option) => option.id === id) ?? iconCatalog[0]!;
}
