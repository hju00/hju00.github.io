"use client"

import { 
  Globe, 
  ArrowRightLeft, 
  Network, 
  Share2, 
  Blocks, 
  Puzzle, 
  DraftingCompass, 
  Zap, 
  Database,
  Server,
  Code2,
  Layers,
  Cpu
} from "lucide-react";

// Fallback for icons not found in devicons-react or specific requests
// We will use simple-icons CDN for a cleaner look if devicons-react is too heavy or missing icons.
// Actually, simple-icons via CDN is the most lightweight and comprehensive solution.

export const TechIcon = ({ name, size = 24 }: { name: string; size?: number }) => {
  // 1. Lucide Icons Mapping (Concepts & Methodologies)
  const lucideMap: { [key: string]: React.ElementType } = {
    "RESTful API": Globe,
    "Transaction Management": ArrowRightLeft,
    "Hyperledger Fabric": Blocks, // Blockchain blocks
    "System Architecture": Network,
    "Distributed Systems": Share2,
    "Microservices": Puzzle,
    "Design Patterns": DraftingCompass,
    "Query Optimization": Zap,
    "Database Design": Database,
    "Indexing Strategies": Layers,
    "Crawling": Code2, // Scripting
    "API Integration": Server,
    "UML": DraftingCompass,
  };

  if (lucideMap[name]) {
    const LucideIcon = lucideMap[name];
    return <LucideIcon size={size} className="text-slate-600 dark:text-slate-400" />;
  }

  // 2. Simple Icons Mapping (Brands & Products)
  const slugMap: { [key: string]: string } = {
    "Spring Boot": "springboot",
    "Spring Security": "springsecurity",
    "Java": "openjdk",
    "MySQL": "mysql",
    "CouchDB": "apachecouchdb",
    "Docker": "docker",
    "CI/CD": "githubactions", // Using GitHub Actions as representative
    "Node.js": "nodedotjs",
    "Vue.js": "vue.js",
    "React": "react",
    "Next.js": "nextdotjs",
    "TypeScript": "typescript",
    "JPA": "hibernate", // Hibernate is the default JPA provider
    "Go": "go",
    "ELK Stack": "elastic",
    "AWS": "amazonaws",
    "Git": "git",
    "Redis": "redis",
    "Linux": "linux",
    "Ubuntu": "ubuntu",
    "Vim": "vim",
    "IntelliJ": "intellijidea",
    "Postman": "postman",
    "Slack": "slack",
    "Notion": "notion",
    "Python": "python",
    "Kotlin": "kotlin",
  };

  const slug = slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Use simpleicons.org CDN
  return (
    <img 
      src={`https://cdn.simpleicons.org/${slug}`} 
      alt={name}
      width={size}
      height={size}
      className="dark:invert dark:opacity-80 opacity-70"
      onError={(e) => {
        // Fallback to a generic CPU icon if branding icon not found
        e.currentTarget.style.display = 'none';
        // We can render a fallback component here, but since it's an img tag, 
        // we'll handle fallback via parent or just hide it.
        // For better UX, let's just leave it hidden or show a generic block in the future.
      }}
    />
  );
};