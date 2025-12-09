"use client"

import {
  JavaOriginal,
  SpringOriginal,
  SpringsecurityOriginal,
  MysqlOriginal,
  CouchdbOriginal,
  DockerOriginal,
  JenkinsOriginal,
  GitOriginal,
  LinuxOriginal,
  RedisOriginal,
  MongodbOriginal,
  PostgresqlOriginal,
  ReactOriginal,
  NextjsOriginal,
  TailwindcssOriginal,
  TypescriptOriginal,
  JavascriptOriginal,
  Html5Original,
  Css3Original,
  NginxOriginal,
  AmazonwebservicesOriginalWordmark,
  UbuntuOriginal,
  VimOriginal,
  IntellijOriginal,
  PostmanOriginal,
  SlackOriginal,
  JiraOriginal,
  NotionOriginal,
  FigmaOriginal,
  PythonOriginal,
  CplusplusOriginal,
  COriginal,
  GoOriginal,
  KotlinOriginal,
  SwiftOriginal,
  DartOriginal,
  FlutterOriginal,
  AndroidOriginal,
  AppleOriginal,
  Windows8Original,
  NodejsOriginal,
} from "devicons-react";

// Fallback for icons not found in devicons-react or specific requests
// We will use simple-icons CDN for a cleaner look if devicons-react is too heavy or missing icons.
// Actually, simple-icons via CDN is the most lightweight and comprehensive solution.

export const TechIcon = ({ name, size = 24 }: { name: string; size?: number }) => {
  // Normalize name for Simple Icons slug
  const slugMap: { [key: string]: string } = {
    "Spring Boot": "springboot",
    "Spring Security": "springsecurity",
    "RESTful API": "openapiinitiatives", // Representative
    "Microservices": "microgenetics", // Placeholder/Representative or generic
    "Design Patterns": "designernews", // Placeholder
    "Java": "openjdk",
    "MySQL": "mysql",
    "CouchDB": "apachecouchdb",
    "Hyperledger Fabric": "hyperledger",
    "Docker": "docker",
    "CI/CD": "githubactions", // Representative
    "System Architecture": "architectura", // Placeholder
    "Distributed Systems": "distributed-tracing", // Placeholder
    "Query Optimization": "googlecloudspanner", // Placeholder
    "Database Design": "databricks", // Placeholder
    "Transaction Management": "transaction", // Generic
    "Indexing Strategies": "index", // Generic
    "Node.js": "nodedotjs",
    "Vue.js": "vue",
    "React": "react",
    "Next.js": "nextdotjs",
    "TypeScript": "typescript",
    "JPA": "hibernate",
    "Go": "go",
    "ELK Stack": "elastic",
    "Crawling": "robotframework", // Representative
    "API Integration": "postman", // Representative
    "AWS": "amazonaws",
    "Git": "git",
    "Redis": "redis",
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
        // Fallback to a generic shield if icon not found
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};
