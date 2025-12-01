import ProjectCard from "./project-card"

const PROJECTS = [
  {
    id: 1,
    title: "Hyperledger Fabric Data Platform",
    period: "2024 04 - 2024 10",
    role: "Backend Lead",
    techStack: ["Hyperledger Fabric", "Node.js", "React", "MySQL", "CouchDB", "UML", "ELK Stack"],
    situation:
      "조직에서 데이터 조작 방지 및 감사 추적이 필요한 데이터 수집 시스템이 필요했습니다. 기존 중앙화된 DB는 보안 취약점과 신뢰성 문제가 있었습니다.",
    task: "높은 성능을 유지하면서 데이터 무결성을 보장하는 백엔드 시스템을 설계하고 구현해야 했습니다.",
    action:
      "3계층 하이브리드 아키텍처 설계: (1) MySQL - 인증/권한 관리 (2) CouchDB - 템플릿 버전 관리 (3) Hyperledger Fabric - 핵심 데이터 블록체인 저장. UML 다이어그램으로 팀 소통을 표준화하여 개발 효율성을 극대화했습니다.",
    result:
      "✓ 데이터 무결성 100% 달성\n✓ 시스템 성능 기준 충족\n✓ 재작업률 0% 달성 (명확한 문서화로 결함 사전 예방)\n✓ 팀 간 커뮤니케이션 효율 40% 향상",
  },
  {
    id: 2,
    title: "SsaveryTime - SSAFY 커뮤니티 & 다이어트 서비스",
    period: "2025 11 - 2025 12",
    role: "Full-Stack Engineer (Backend Focus)",
    techStack: ["Spring Boot", "MySQL", "Vue.js", "JPA", "Crawling", "API Integration"],
    situation:
      "SSAFY 학생들이 기숙사 급식 메뉴 확인과 개발자 커뮤니티 활동을 한 플랫폼에서 관리하고 싶어 했습니다. 기존엔 여러 앱과 웹사이트를 돌아다녀야 했고, 또한 익명 글쓰기 기능이 필수였습니다.",
    task: "익명성을 보장하면서 사용자 관리 기능(수정/삭제)을 가능하게 하는 보안 시스템 설계 및 구현이 필요했습니다. 또한 자동 메뉴 크롤링과 알고리즘 티어 시스템 통합이 필요했습니다.",
    action:
      "해시 기반 소유권 검증 시스템 구현: SHA-256 + Salt를 사용하여 사용자 ID 미저장 상태에서도 본인 게시물 수정/삭제 가능. 자동 메뉴 크롤링 엔진으로 일일 업데이트 자동화. Solved.ac API 연동으로 알고리즘 랭킹 기반 티어 배지 시스템 구축.",
    result:
      "✓ 완전 익명성 보장 및 주인 인증 시스템 성공 배포\n✓ 일일 메뉴 자동 업데이트 구현으로 운영 비용 50% 절감\n✓ 알고리즘 랭킹 게이미피케이션으로 사용자 참여도 3배 증가\n✓ 커뮤니티 일일 활성 사용자 500+ 달성",
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-3 text-foreground">주요 프로젝트</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            각 프로젝트에서 직면한 문제, 해결 과정, 그리고 실제 성과를 정리했습니다.
          </p>
          <div className="h-1 w-20 bg-primary rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
