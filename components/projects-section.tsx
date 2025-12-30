import ProjectCard from "./project-card"
import { CodeBlock } from "./troubleshooting-dialog"

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
    result: "데이터 위변조를 원천 차단하고 무의미한 데이터 생성을 방지하여, 신뢰도 99%의 고품질 데이터 수집 파이프라인을 완성했습니다.",
    image: "/projects/project1-thumbnail.png", // Replace with project screenshot
    // architecture: "/architecture-placeholder.png" // Uncomment when you have an architecture diagram
  },
  {
    id: 2,
    title: "SsaveryTime - SSAFY 커뮤니티 & 다이어트 서비스",
    period: "2025.11 - 2025.12",
    role: "Full-Stack Engineer (Backend Focus)",
    techStack: ["Spring Boot", "MySQL", "Vue.js", "JPA", "Crawling", "API Integration"],
    situation:
      "SSAFY 교육생들을 위한 정보 채널(식단, 커뮤니티, 알고리즘 정보)이 파편화되어 있어 접근성이 낮았고, 자유로운 소통을 저해하는 실명 기반 시스템의 한계를 극복하기 위해 **통합 익명 플랫폼**의 필요성이 대두되었습니다.",
    task:
      "가장 큰 기술적 난제는 **'데이터베이스 관리자조차 작성자를 특정할 수 없는 완전한 익명성'**을 보장하면서도, 작성자 본인만은 게시글을 수정/삭제할 수 있는 **논리적 모순(Trade-off)**을 해결하는 것이었습니다. 또한 외부 데이터(식단, Solved.ac) 동기화 시 발생하는 지연 시간을 최소화해야 했습니다.",
    action:
      "1. **Security Architecture:** 단방향 해시(SHA-256)와 Salt를 결합한 **'비식별 소유권 검증 모델'**을 설계했습니다. 사용자 정보와 비밀번호를 결합해 생성한 해시값만을 저장하여, DB 상에서 역추적을 원천 차단하면서도 소유권 검증이 가능하도록 구현했습니다.\n2. **Data Pipeline:** Spring Scheduler와 Jsoup을 활용한 자동화된 크롤링 파이프라인을 구축하고, 빈번한 Solved.ac API 호출에 캐싱(Caching) 전략을 적용하여 응답 속도를 최적화했습니다.",
    result:
      "서비스를 성공적으로 런칭하여 보안 사고 없는 안전한 익명 소통 공간을 제공했습니다. 특히 API 캐싱 도입으로 외부 의존성이 높은 페이지의 로딩 속도를 50% 이상 개선했으며, 데이터 수집 자동화로 운영 리소스를 'Zero' 수준으로 최소화하는 데 성공했습니다.",
    image: "/placeholder.jpg", // Replace with project screenshot
    // architecture: "/ssaverytime-architecture.png", // Add architecture diagram here
    troubleshooting: {
      title: "API 403 Forbidden 에러와 Docker DB 스키마 동기화 이슈",
      date: "2025-12-09",
      environment: "Spring Boot 3.x, Spring Security 6, MySQL 8.0, Docker Compose, Vue.js 3",
      sections: [
        {
          title: "1. 문제 상황 (Symptoms)",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>현상:</strong> 프론트엔드에서 게시글 목록 조회 API (<code>GET /api/board</code>) 호출 시 403 Forbidden 에러 발생.
              </li>
              <li>
                <strong>예상:</strong> 게시글 목록은 로그인 없이 조회 가능해야 하므로 200 OK가 기대됨.
              </li>
            </ul>
          ),
        },
        {
          title: "2. 초기 분석 및 시도 (Initial Analysis)",
          content: (
            <div className="space-y-4">
              <div>
                <strong>2.1 Spring Security 설정 확인</strong>
                <p className="mt-1">
                  SecurityConfig.java를 확인한 결과, <code>GET /api/board</code> 경로에 대한 <code>permitAll()</code> 설정이 누락되어 있음을 발견.
                </p>
                <CodeBlock label="SecurityConfig.java">
                  {`http.authorizeHttpRequests(auth -> auth
    .requestMatchers(HttpMethod.GET, "/api/board/**").permitAll() // 추가
    .anyRequest().authenticated()
);`}
                </CodeBlock>
                <p className="text-sm text-muted-foreground">→ 결과: 여전히 403 Forbidden 발생. curl 테스트로도 동일 증상.</p>
              </div>
              <div>
                <strong>2.2 빌드 및 배포 상태 확인</strong>
                <p className="mt-1">
                  수정된 코드가 Docker 컨테이너에 반영되지 않았을 가능성 의심하여 강제 재빌드 수행.
                </p>
                <CodeBlock label="Terminal">docker-compose up -d --build backend</CodeBlock>
                <p className="text-sm text-muted-foreground">→ 결과: 로그에 초기화 메시지가 떴음에도 불구하고 API 요청 시 여전히 403 반환.</p>
              </div>
            </div>
          ),
        },
        {
          title: "3. 심층 분석 (Deep Dive)",
          content: (
            <div className="space-y-4">
              <div>
                <strong>3.1 Security Debug Log 활성화</strong>
                <p>원인을 찾기 위해 application.properties에 Security 디버그 로그를 활성화했습니다.</p>
                <CodeBlock label="application.properties">logging.level.org.springframework.security=DEBUG</CodeBlock>
              </div>
              <div>
                <strong>3.2 로그 분석 결과</strong>
                <CodeBlock label="Server Log">
{`Servlet.service() ... threw exception [Request processing failed: org.springframework.jdbc.BadSqlGrammarException: 
...
### Cause: java.sql.SQLSyntaxErrorException: Unknown column 'b.UPDATED_AT' in 'field list'
...
Securing GET /error?page=1&size=10
...
Pre-authenticated entry point called. Rejecting access`}
                </CodeBlock>
                <ul className="list-decimal list-inside space-y-2 mt-2">
                  <li><strong>진짜 원인:</strong> Security가 막은 것이 아니라, 내부적으로 SQL 에러(BadSqlGrammarException)가 발생함.</li>
                  <li><strong>왜 SQL 에러인가?:</strong> <code>b.UPDATED_AT</code> 컬럼이 DB에 없음. 로컬 코드에는 추가했지만 DB에 반영 안 됨.</li>
                  <li><strong>왜 403인가?:</strong> 내부 에러(500) 발생 → WAS가 <code>/error</code> 엔드포인트로 포워딩 → <code>/error</code> 경로는 permitAll 설정이 안 되어 있음 → 익명 사용자가 <code>/error</code>에 접근하려다 403 Forbidden 발생.</li>
                </ul>
              </div>
              <div>
                <strong>3.3 DB 스키마 불일치 원인 (Docker)</strong>
                <p>
                  <code>docker-compose.yml</code> 설정 확인 결과, 초기화 스크립트가 마운트되지 않았고, 
                  기존 Docker Volume이 유지되어 스키마 변경사항이 반영되지 않았습니다.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "4. 해결 방법 (Resolution)",
          content: (
            <div className="space-y-4">
              <div>
                <strong>4.1 docker-compose.yml 수정</strong>
                <p>MySQL 컨테이너 생성 시 초기화 스크립트가 실행되도록 볼륨 마운트 추가.</p>
                <CodeBlock label="docker-compose.yml">
{`db:
  image: mysql:8.0
  volumes:
    - db-data:/var/lib/mysql
    # 아래 라인 추가
    - ./ssaverytime-BE/src/main/resources/database_setup.sql:/docker-entrypoint-initdb.d/1_database_setup.sql`}
                </CodeBlock>
              </div>
              <div>
                <strong>4.2 Docker Volume 초기화</strong>
                <p>기존 데이터(구 스키마)를 삭제하고 새로 초기화하기 위해 볼륨 삭제 후 재시작.</p>
                <CodeBlock label="Terminal">
{`docker-compose down -v  # -v 옵션으로 볼륨 삭제
docker-compose up -d --build`}
                </CodeBlock>
              </div>
            </div>
          ),
        },
        {
          title: "5. 교훈 (Lessons Learned)",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>HTTP 상태 코드의 이면:</strong> 403 Forbidden이 반드시 보안 설정 문제만을 의미하지 않는다. 내부 에러로 인한 에러 페이지 리다이렉트 과정에서 권한 문제가 발생할 수 있음을 인지해야 한다.
              </li>
              <li>
                <strong>Docker Volume의 영속성:</strong> DB 스키마 변경 시, 로컬 파일만 수정한다고 Docker Volume 내부의 데이터가 바뀌지 않는다. 개발 환경에서는 과감하게 볼륨을 초기화(<code>down -v</code>)하는 습관이 필요하다.
              </li>
              <li>
                <strong>로그의 중요성:</strong> 막연한 추측보다 DEBUG 레벨의 로그가 문제의 진짜 원인(SQL Error)을 바로 보여주었다.
              </li>
            </ul>
          ),
        },
      ],
    },
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
