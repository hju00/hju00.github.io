import ProjectCard from "./project-card"

const PROJECTS = [
  {
    id: 1,
    title: "Hyperledger Fabric 기반 데이터 수집 플랫폼",
    period: "2024.04 - 2024.10",
    role: "Backend Lead (Architecture)",
    techStack: ["Hyperledger Fabric", "Node.js", "GO", "MySQL", "CouchDB", "UML", "ELK Stack"],
    situation: "기존 퍼블릭 블록체인은 익명성으로 인한 '무분별한 데이터 생성(Spam Data)' 문제가 있었고, 중앙집중형 시스템은 데이터 투명성이 부족했습니다.",
    task: "데이터의 '무결성(Integrity)'을 보장하면서도, 인가된 사용자만 참여시켜 데이터 품질을 유지할 수 있는 '허가형 블록체인 시스템' 구축이 필요했습니다.",
    action: "1. Hyperledger Fabric을 도입하여 참여자를 제한하는 멤버십 서비스(MSP)를 구축했습니다.\n2. 데이터 성격에 따라 3-Tier(MySQL-CouchDB-Fabric) 저장소 분리 아키텍처를 설계하여 성능 효율을 높였습니다.\n3. 스마트 컨트랙트(Chaincode)로 검증 로직을 자동화하여 휴먼 에러를 최소화했습니다.",
    result: "데이터 위변조를 원천 차단하고 무의미한 데이터 생성을 방지하여, 신뢰도 99%의 고품질 데이터 수집 파이프라인을 완성했습니다."
  },
  {
    id: 2,
    title: "SsaveryTime - SSAFY 커뮤니티 & 다이어트 서비스",
    period: "2025.11 - 2025.12",
    role: "Full-Stack Engineer (Backend Focus)",
    techStack: ["Spring Boot", "MySQL", "Vue.js", "JPA", "Crawling", "API Integration"],
    situation:
      "SSAFY 학생들이 점심 메뉴 확인과 개발자 커뮤니티 활동을 한 플랫폼에서 관리하고 싶어 했습니다. 기존엔 여러 앱과 웹사이트를 돌아다녀야 했고, 또한 익명 글쓰기 기능이 필수였습니다.",
    task: "익명성을 보장하면서 사용자 관리 기능(수정/삭제)을 가능하게 하는 보안 시스템 설계 및 구현이 필요했습니다. 또한 자동 메뉴 크롤링과 알고리즘 티어 시스템 통합이 필요했습니다.",
    
    // 수정 포인트: 기술적 의사결정과 아키텍처 설계를 구체적으로 명시
    action:
      "DB 상에서 작성자 역추적을 원천 차단하기 위해 단방향 해시(SHA-256)와 Salt를 결합한 '소유권 검증 아키텍처'를 설계하여 익명성과 관리 기능을 동시에 확보함. Spring Scheduler와 Jsoup을 활용한 '메뉴 데이터 파이프라인'을 구축하여 외부 데이터 의존성을 최소화하고, Solved.ac API 연동 시 캐싱 전략을 적용하여 외부 API 호출 비용을 절감함.",
    
    // 수정 포인트: '운영 수치' 대신 '기술적 완성도'와 '자동화 성과' 강조
    result:
      "✓ 익명 소유권 검증 로직 구현 및 보안 테스트 통과 (DB 레벨 추적 불가능 검증)\n✓ 메뉴 데이터 수집 100% 자동화로 수동 업데이트 소요 시간 0분으로 단축\n✓ 알고리즘 티어 연동 시스템 구축으로 게이미피케이션 기반 커뮤니티 마련\n✓ RESTful API 설계 및 Swagger 문서화로 프론트엔드 협업 효율 증대",
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 view-trigger">
          <h2 className="text-4xl font-bold mb-3 text-foreground">주요 프로젝트</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
            각 프로젝트에서 직면한 문제, 해결 과정, 그리고 실제 성과를 정리했습니다.
          </p>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id} 
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both view-trigger"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
