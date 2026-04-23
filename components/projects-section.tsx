import ProjectCard from "./project-card"
import { CodeBlock } from "./troubleshooting-dialog"

const PROJECTS = [
  {
    id: 4,
    title: "Donttaz - AI 기반 스마트 금고 핀테크 플랫폼",
    period: "2026.02 - 2026.03",
    role: "Team Lead (Backend & DevOps)",
    overview: "월급 로그아웃 현상을 막기 위해 기획된, 소비와 저축을 병렬로 관리하는 AI 기반 스마트 금고 모바일 서비스입니다. 6인 핀테크 팀 프로젝트로 진행되었습니다.",
    contribution: "인프라와 CI/CD 파이프라인, 비동기 알림 및 이체 백엔드 로직을 전담했습니다. Nginx와 Jenkins를 연동한 Blue-Green 환경으로 무중단 배포를 달성했고, 모계좌 동시 접근 시 발생할 수 있는 Race Condition 방어 로직을 구현했습니다.",
    techStack: [
      { name: "Spring Boot", reason: "복잡한 금융/이체 비즈니스 로직을 모듈화하여 객체지향적으로 관리하고 안정적으로 구축하기 위해 선택했습니다." },
      { name: "Redis", reason: "다수 금고에서의 빈번한 동시 출금 상황 시 모계좌 잔액 정합성을 보장하기 위해 분산 락(Distributed Lock)으로 활용했습니다." },
      { name: "RabbitMQ", reason: "외부 플랫폼 알림 전송 API의 통신 지연이 핵심 비즈니스(입출금) 트랜잭션의 성능을 저하시키지 않도록 비동기로 격리했습니다." },
      { name: "Jenkins", reason: "Blue-Green 아키텍처 환경에서의 무중단 배포 스크립트를 파이프라인으로 구성해 다운타임을 완전히 제거했습니다." }
    ],
    image: "/projects/project4-thumbnail.gif",
    award: "SSAFY 14기 핀테크 특화 프로젝트",
    troubleshooting: {
      title: "RabbitMQ 비동기 전환 시 알림 메시지 유실 이슈 대응",
      date: "2026-03-20",
      environment: "Spring Boot 3.5.11, RabbitMQ 3",
      sections: [
        {
          title: "1. 문제 상황 (Symptoms)",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>웹훅 알림을 RabbitMQ 비동기 방식으로 분리한 이후, 간헐적으로 외부 알림이 누락되어 완전히 발송되지 않는 심각한 디버프 현상이 포착되었습니다.</li>
            </ul>
          )
        },
        {
          title: "2. 원인 분석 (Root Cause)",
          content: (
            <p className="mt-1">
              기본 <code>Auto-Acknowledge</code> 정책으로 인해, RabbitMQ Consumer가 메시지를 스레드에 읽자마자 해당 메시지가 큐에서 삭제 처리된 것이 원인이었습니다. 컨텍스트 내부 로직 실행 중 통신 타임아웃 장애가 발생하면 알림 페이로드를 복구할 수 없는 상태가 되었습니다.
            </p>
          )
        },
        {
          title: "3. 해결 방법 (Resolution)",
          content: (
            <div className="space-y-4">
              <div>
                <strong>Manual Acknowledge + Retry 로직 적용</strong>
                <p>수동 확인 정책을 도입하여, 로직 처리가 완벽히 끝난 시점에만 메시지 삭제 처리를 지시하고, 장애 대비 지수 백오프 기반 재시도(RetryPolicy) 템플릿을 설정했습니다.</p>
                <CodeBlock label="RabbitListener 설정">
{`factory.setAcknowledgeMode(AcknowledgeMode.MANUAL);
factory.setRetryOperations(retryTemplate()); // 지수 백오프 기반`}
                </CodeBlock>
              </div>
              <div>
                <strong>Dead Letter Queue(DLQ) 도입</strong>
                <p>3회 재시도에도 실패하는 네트워크 데드 메시지들은 큐의 병목을 막으면서도 향후 대조를 위해 별도의 DLQ로 격리시켜 100% 메시지 보존 인프라를 구축했습니다.</p>
              </div>
            </div>
          )
        },
        {
          title: "4. 교훈 (Lessons)",
          content: (
            <p>비동기 메시징 아키텍처는 시스템 간 결합도는 강력하게 낮춰주지만, 반대 급부로 이벤트 정합성 보장(유실 방지) 및 회복성에 대한 인프라 및 코드 레벨의 치밀한 방어 설계가 동반되어야 함을 배웠습니다.</p>
          )
        }
      ]
    }
  },
  {
    id: 3,
    title: "CONY - 기프티콘 관리 및 판매 서비스",
    period: "2026.01 - 2026.02",
    role: "Team Lead (Backend & Infra)",
    overview: "개인 기프티콘 체계화 및 방 단위 룸 기반의 안전한 판매/공유 기능을 제공하는 비즈니스 플랫폼입니다. 6인 프로젝트로, 3개의 개별 백엔드 컨테이너 환경 기반으로 제작되었습니다.",
    contribution: "인프라 총괄로서 서브 서비스별 포트를 통일하고 망을 분리하는 네트워크 격리를 실현했고, 변경 여부를 감지해 필요한 타겟만 배포하는 선택적 지속 통합(CI)을 구축해 빌드 병목을 60% 단축했습니다. 아울러 방장 관리 권한 및 동적 기프티콘 검색 API를 구성했습니다.",
    techStack: [
      { name: "Jenkins & Docker", reason: "단일 젠킨스 파이프라인에서 디렉터리 Changeset을 스캔하는 선택적 서브 빌드 아키텍처로 빌드 소요를 줄이고자 연동했습니다." },
      { name: "JPA (Specification)", reason: "방 참여자 다중 권한 계층과 정렬/필터링 등 복잡한 기프티콘 동적 검색 쿼리를 가독성 있는 객체 구조로 관리하기 위해 채택했습니다." },
      { name: "Nginx", reason: "내부 컨테이너를 숨김과 동시에 외부 노출을 단일 포트(80/443)로 제어 및 리버스 프록시 하기 위해 도입했습니다." }
    ],
    image: "/projects/project3-thumbnail.png",
    award: "SSAFY 14기 공통 프로젝트 우수상",
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
  {
    id: 2,
    title: "SsaveryTime - SSAFY 통합 커뮤니티 플랫폼",
    period: "2025.11 - 2025.12",
    role: "Full-Stack (UI / Backend / AI / DevOps)",
    overview: "분산된 사내 교육 정보들을 하나로 통합하고, 제약 없는 원활한 소통을 위해 개발한 '완전 익명' 보장형 사내 모바일 커뮤니티 애플리케이션입니다. (2인 단위 프로젝트)",
    contribution: "소규모 프로젝트 단위로 UI, 백엔드, AI 서빙, 인프라를 총괄했습니다. DB 관리자도 작성자를 역추적할 수 없도록, 식별 해시(Salt+SHA-256) 단방향 알고리즘에 기반한 익명 소유권 검증 로직 구조를 직접 고안했습니다.",
    techStack: [
      { name: "Spring Boot", reason: "커뮤니티의 복잡한 연관 관계(게시물, 좋아요, 댓글 등)의 엔티티 영속성을 안정적으로 관리하기 위함입니다." },
      { name: "FastAPI", reason: "본문 AI 자동 요약 기능 연산 시 메인 API 서버의 리소스 스레드 결합을 끊고 독립시키기 위해 채택했습니다." },
      { name: "Docker", reason: "분산된 서브 모듈 인프라를 하나의 네트워크망으로 한 번에 관리해 인프라 스위칭 비용을 최소화하기 위해 사용했습니다." }
    ],
    image: "/projects/project2-thumbnail.png",
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
                <strong>HTTP 상태 코드의 이면:</strong> 403 Forbidden이 반드시 보안 설정 문제만을 의미하지 않는다. 내부 에러로 인한 에러 페이지 리다이렉트 과정에서 권한 문제가 발생할 수 있음을 인지해야 단다.
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
    id: 1,
    title: "Hyperledger Fabric 기반 데이터 수집 플랫폼",
    period: "2024.04 - 2024.10",
    role: "Backend Lead (Architecture)",
    overview: "기존 퍼블릭 블록체인의 무분별한 데이터 스팸 문제와 중앙집중형 시스템의 투명성 부족 현상을 융합 해소하기 위해, 인가된 사용자만 참여할 수 있는 퍼미션드(허가형) 데이터 수집 블록체인 네트워크를 구축했습니다.",
    contribution: "Backend Lead로서 프로젝트 내 기술 선정을 주도하고, 관계형 DB, Document DB, 그리고 체인으로 나눈 분리된 3-Tier 저장소 아키텍처를 설계하여 응답 속도 병목을 최적화했습니다.",
    techStack: [
      { name: "Hyperledger Fabric", reason: "신뢰할 수 있는 노드 기관들만 인가하여 프라이빗 생태계를 유지하는 멤버십 기반(MSP) 메커니즘을 구성하기 위함입니다." },
      { name: "Node.js", reason: "Fabric Gateway SDK와의 비동기 블로킹 연동 처리가 원활하여 블록체인 릴레이어 서버로 채택했습니다." },
      { name: "MySQL / CouchDB", reason: "일반 업무 상태 관리는 도큐먼트 모델(Couch)로, 외래키 중심의 구조 모델은 RDB로 나누어 스토리지 레이어를 분산시켰습니다." }
    ],
    image: "/projects/project1-thumbnail.png",
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
