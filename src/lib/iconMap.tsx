import {
    Trophy, Zap, Star, Award, Laptop, Rocket, Cpu, Code, Users, Heart, Handshake, Mail, Github, Linkedin, ExternalLink, ShieldCheck, Calendar, MapPin, Target, Layout
} from "lucide-react";

export const IconMap: { [key: string]: React.ReactNode } = {
    Trophy: <Trophy size={28} />,
    Zap: <Zap size={28} />,
    Star: <Star size={28} />,
    Award: <Award size={28} />,
    Laptop: <Laptop size={24} />,
    Rocket: <Rocket size={24} />,
    Cpu: <Cpu size={24} />,
    Code: <Code size={24} />,
    Users: <Users size={28} />,
    Heart: <Heart size={28} />,
    Handshake: <Handshake size={28} />,
    Mail: <Mail size={22} />,
    Github: <Github size={22} />,
    Linkedin: <Linkedin size={22} />,
    ExternalLink: <ExternalLink size={20} />,
    ShieldCheck: <ShieldCheck size={18} />,
    Calendar: <Calendar size={18} />,
    MapPin: <MapPin size={18} />,
    Target: <Target size={14} />,
    Layout: <Layout size={18} />
};

export const getIcon = (name: string, size = 28) => {
    const icons: { [key: string]: any } = {
        Trophy, Zap, Star, Award, Laptop, Rocket, Cpu, Code, Users, Heart, Handshake, Mail, Github, Linkedin, ExternalLink, ShieldCheck, Calendar, MapPin, Target, Layout
    };
    const IconComponent = icons[name];
    return IconComponent ? <IconComponent size={size} /> : null;
};
