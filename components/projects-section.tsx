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
    title: "SsaveryTime - SSAFY 통합 커뮤니티 플랫폼",
    period: "2025.11 - 2025.12",
    role: "Full-Stack (UI / Backend / AI / DevOps)",
    techStack: ["Spring Boot", "MyBatis", "MySQL", "Vue.js", "FastAPI", "Docker", "JWT", "Prometheus", "Grafana"],
    situation:
      "SSAFY 교육생들을 위한 정보(식단, 커뮤니티, 알고리즘 랭킹)가 여러 플랫폼에 파편화되어 있었습니다. 또한 기존 커뮤니티는 실명 기반으로 운영되어 자유로운 소통이 어렵다는 문제가 있었습니다. 이를 해결하기 위해 2인 팀으로 통합 익명 커뮤니티 플랫폼을 개발했습니다.",
    task:
      "가장 큰 기술적 과제는 DB 관리자조차 작성자를 특정할 수 없는 완전한 익명성을 보장하면서도, 작성자 본인만은 자신의 게시글을 수정/삭제할 수 있게 하는 것이었습니다. 또한 게시판 CRUD, 좋아요/스크랩/신고 기능, Solved.ac 연동, AI 게시글 요약, Docker 기반 배포 및 모니터링 환경 구축까지 전반적인 시스템 설계와 구현이 필요했습니다.",
    action:
      "1. 익명 소유권 검증 시스템: 익명 게시글 작성 시 userSeq를 DB에 NULL로 저장하고, 대신 게시글 ID와 사용자 ID를 조합한 SHA-256 해시값만 별도 테이블(AnonymousBoard)에 저장하여, DB에서 작성자를 역추적할 수 없으면서도 해시 비교를 통해 소유권 검증이 가능하도록 구현했습니다.\n2. 게시판 및 소셜 기능 API: Spring Boot + MyBatis 기반으로 게시글 CRUD, 좋아요/스크랩 토글, 게시글 신고, 키워드 검색 및 정렬, 페이징 조회 등의 RESTful API를 설계하고 구현했습니다. Spring Security + JWT 기반 인증/인가를 적용하고, Solved.ac API 연동으로 사용자 백준 티어 정보를 실시간 표시했습니다.\n3. AI 게시글 요약 서비스: FastAPI로 별도 AI 마이크로서비스를 구축하여, 200자 이상의 긴 게시글을 AI가 자동 요약하는 기능을 구현했습니다. 요약 결과를 DB에 캐싱하여 중복 호출을 방지했습니다.\n4. Docker Compose 인프라: Frontend, Backend, AI, Prometheus, Grafana 총 5개 서비스를 Docker Compose로 오케스트레이션하고, AWS EC2 + RDS 환경에 배포했습니다. Spring Boot Actuator 메트릭을 Prometheus로 수집하고 Grafana 대시보드로 실시간 모니터링 체계를 구축했습니다.",
    result:
      "2인 팀으로 6주 만에 서비스를 성공적으로 런칭했습니다. 해시 기반 익명 소유권 검증 시스템으로 보안 사고 없이 안전한 익명 소통 공간을 제공했으며, AI 요약 캐싱으로 중복 API 호출을 제거하고, Docker 기반 자동 배포 환경으로 운영 효율을 극대화했습니다.",
    image: "/projects/project2-thumbnail.png", // Replace with project screenshot
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
  {
    id: 3,
    title: "CONY - 기프티콘 관리 및 판매 서비스",
    period: "2026.01 - 2026.02",
    role: "Team Lead (Backend & Infra)",
    techStack: ["Spring Boot", "JPA", "MySQL", "Redis", "Docker", "Jenkins", "Nginx", "Prometheus", "Grafana", "AWS S3"],
    situation:
      "SSAFY 14기 공통 프로젝트로 6인 팀에서 모바일 기프티콘 관리 및 판매 서비스를 개발했습니다. 3개의 독립적인 백엔드 서비스(Manage, Payment, AI)를 안정적으로 운영할 인프라 구축과 함께, 핵심 기능인 기프티콘 공유방 시스템의 백엔드 API 개발을 담당했습니다.",
    task:
      "인프라 측면에서는 마이크로서비스 간 네트워크 격리, 20개 이상의 환경변수 보안 관리, 변경된 서비스만 골라서 배포하는 선택적 CI/CD 파이프라인, 실시간 모니터링 체계 구축이 필요했습니다. 백엔드 측면에서는 공유방 생성/참여/관리, 초대 코드 기반 참여, 방장 권한 관리(멤버 강퇴/방 삭제), 방 내 기프티콘 검색 및 페이징 조회 등 복합적인 비즈니스 로직 설계가 필요했습니다.",
    action:
      "1. 공유방 API 설계 및 구현: 공유방 CRUD, 초대 코드(UUID) 기반 참여 시스템, 방장/멤버 역할 분리(RoomRole), 강퇴 시 재가입 방지를 위한 BannedRoomMember 엔티티 등 세밀한 권한 관리 로직을 설계했습니다. JPA Specification을 활용한 동적 쿼리로 방 내 기프티콘의 상태별/키워드별 검색 및 페이징 조회를 구현했습니다.\n2. Docker Compose 멀티 서비스 오케스트레이션: 3개 백엔드 서비스를 각각 독립 컨테이너로 구성하고, 외부 Docker Network(cony-net)로 서비스 간 통신을 격리하면서도 연결성을 확보했습니다.\n3. Jenkins CI/CD 조건부 배포: Jenkinsfile에서 changeset 디렉티브를 활용해 변경된 서비스만 감지하여 선택적으로 빌드/배포하는 파이프라인을 구축했습니다. Jenkins Credentials를 통해 환경변수를 안전하게 주입하고, 빌드 후 자동 삭제하는 보안 프로세스를 적용했습니다.\n4. Prometheus + Grafana 모니터링: Spring Boot Actuator 메트릭을 Prometheus로 수집하고, Grafana 대시보드를 프로비저닝하여 서비스 상태, JVM 메모리, API 응답 시간 등을 실시간으로 모니터링할 수 있는 환경을 구축했습니다.\n5. Nginx 리버스 프록시: 외부 트래픽을 Nginx에서 받아 각 서비스 포트로 분배하는 리버스 프록시를 구성하여, 단일 도메인으로 모든 서비스에 접근할 수 있도록 했습니다.",
    result:
      "공유방 API를 통해 사용자 간 기프티콘 공유 핵심 기능을 안정적으로 제공했습니다. 변경된 서비스만 선택적으로 빌드/배포하여 CI/CD 소요 시간을 약 60% 단축했으며, Docker 기반 컨테이너 오케스트레이션으로 무중단 운영 환경을 구축했습니다. Prometheus + Grafana 모니터링으로 실시간 장애 감지 및 대응 체계를 확립하여, 프로젝트 기간 동안 인프라 장애로 인한 서비스 다운타임 없이 안정적으로 운영을 완료했습니다.",
    image: "/projects/project3-thumbnail.png",
    troubleshooting: {
      title: "공유방 기프티콘 썸네일 미표시 및 DTO 필드 누락 이슈",
      date: "2026-02-07",
      environment: "Spring Boot 3.x, JPA, MySQL 8.0, Docker Compose, React Native",
      sections: [
        {
          title: "1. 문제 상황 (Symptoms)",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>현상 1:</strong> '내 쿠폰함'에서는 기프티콘 썸네일이 정상 표시되지만, 공유방 내 기프티콘 목록에서는 썸네일이 전혀 표시되지 않음.
              </li>
              <li>
                <strong>현상 2:</strong> 공유방 기프티콘을 클릭해 상세 페이지로 이동 시, 원가·바코드·소유자 정보 등이 표시되지 않아 FE에서 에러 발생.
              </li>
              <li>
                <strong>예상:</strong> 공유방에서도 내 쿠폰함과 동일한 수준의 기프티콘 정보가 표시되어야 함.
              </li>
            </ul>
          ),
        },
        {
          title: "2. 원인 분석 (Root Cause Analysis)",
          content: (
            <div className="space-y-4">
              <div>
                <strong>2.1 썸네일 미표시 원인</strong>
                <p className="mt-1">
                  RoomService의 기프티콘 목록 조회 로직을 확인한 결과, THUMBNAIL 타입의 이미지만 조회하고 있었습니다.
                  그러나 일부 기프티콘은 OCR 처리 과정에서 THUMBNAIL이 생성되지 않고 ORIGINAL 이미지만 존재하는 경우가 있었습니다.
                </p>
                <CodeBlock label="RoomService.java (수정 전)">{`// THUMBNAIL 이미지만 조회 → ORIGINAL만 있는 경우 null 반환
Map<Long, String> imageMap = gifticonImageRepository
    .findAllByGifticonIdIn(gifticonIds, ImageType.THUMBNAIL)
    .stream()
    .collect(Collectors.toMap(...));`}</CodeBlock>
              </div>
              <div>
                <strong>2.2 DTO 필드 누락 원인</strong>
                <p className="mt-1">
                  GifticonRoomResponseDto가 최소한의 필드(이름, 브랜드, 유효기한, 상태)만 포함하고 있어서,
                  FE에서 상세 페이지 렌더링에 필요한 originalPrice, barcodeNumber, isOwner, roomId, roomName 필드가 전달되지 않았습니다.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "3. 해결 방법 (Resolution)",
          content: (
            <div className="space-y-4">
              <div>
                <strong>3.1 썸네일 폴백(Fallback) 로직 추가</strong>
                <p>THUMBNAIL이 없는 기프티콘에 대해 ORIGINAL 이미지를 대체로 사용하는 2단계 조회 로직을 구현했습니다.</p>
                <CodeBlock label="RoomService.java (수정 후)">{`// 1단계: THUMBNAIL 이미지 조회
Map<Long, String> thumbnailMap = gifticonImageRepository
    .findAllByGifticonIdIn(gifticonIds, ImageType.THUMBNAIL)
    .stream()
    .collect(Collectors.toMap(...));

// 2단계: THUMBNAIL이 없는 기프티콘만 ORIGINAL 이미지 조회
Map<Long, String> originalMap = gifticonImageRepository
    .findAllByGifticonIdIn(gifticonIds, ImageType.ORIGINAL)
    .stream()
    .filter(img -> !thumbnailMap.containsKey(img.getGifticon().getId()))
    .collect(Collectors.toMap(...));

// 두 맵 합치기 (THUMBNAIL 우선)
Map<Long, String> imageMap = new HashMap<>(thumbnailMap);
imageMap.putAll(originalMap);`}</CodeBlock>
              </div>
              <div>
                <strong>3.2 GifticonRoomResponseDto 필드 확장</strong>
                <p>FE에서 필요한 필드를 DTO에 추가하고, from() 팩토리 메서드에서 엔티티의 연관 관계를 활용해 필드를 채우도록 수정했습니다.</p>
                <CodeBlock label="GifticonRoomResponseDto.java">{`// 추가된 필드
private Integer originalPrice;
private String barcodeNumber;
private Boolean isOwner;
private Long roomId;
private String roomName;

// from() 메서드에 currentUserId 매개변수 추가
public static GifticonRoomResponseDto from(
    Gifticon gifticon, String imageUrl, Long currentUserId) {
    return builder()
        ...
        .isOwner(gifticon.getUser().getId().equals(currentUserId))
        .roomId(gifticon.getRoom() != null 
            && !gifticon.getRoom().getIsDefault()
            ? gifticon.getRoom().getId() : null)
        .roomName(gifticon.getRoom() != null 
            ? gifticon.getRoom().getName() : "기본 쿠폰함")
        .build();
}`}</CodeBlock>
              </div>
            </div>
          ),
        },
        {
          title: "4. 교훈 (Lessons Learned)",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>방어적 데이터 조회:</strong> 외부 시스템(OCR)의 처리 결과에 의존하는 데이터는 항상 대체 경로(Fallback)를 마련해야 한다. THUMBNAIL이 없을 수 있다는 엣지 케이스를 미리 고려했다면 핫픽스를 피할 수 있었다.
              </li>
              <li>
                <strong>FE-BE 간 DTO 계약:</strong> API 응답 DTO를 설계할 때 FE가 실제로 필요로 하는 필드를 미리 정의하는 API 계약(Contract)을 명확히 해야 한다. 최소한의 필드만 전달하면 이후 상세 페이지 개발 시 추가 핫픽스가 불가피하다.
              </li>
              <li>
                <strong>연쇄 버그의 위험:</strong> 하나의 누락(썸네일)을 수정하는 과정에서 또 다른 누락(DTO 필드)을 발견했다. 기능 구현 시 해당 데이터가 사용되는 전체 흐름(목록→상세)을 통합적으로 검토해야 한다.
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
