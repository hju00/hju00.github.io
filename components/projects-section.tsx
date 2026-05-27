import ProjectCard from "./project-card"
import { CodeBlock } from "./troubleshooting-dialog"

const PROJECTS = [
  {
    id: 5,
    title: "ANVI - On-device AI 기반 온라인 시험 감독 솔루션",
    period: "2026.04 - 2026.05",
    role: "Team Lead (AI & Android)",
    overview: "비대면 시험 응시자를 위한 온디바이스 AI 시험 감독 서비스입니다. 스마트폰을 보조 카메라로 활용하여, YOLO 객체 탐지와 Gemma 4 VLM을 통해 부정행위를 실시간으로 감지합니다.\n\n주요 기능: 온디바이스 AI(YOLO+Gemma VLM) 부정행위 감지, 프라이버시 보호 사전 점검, 실시간 다중 모니터링 대시보드, 자동 PDF 리포트 생성",
    contribution: "팀장 겸 AI/Android 파트를 담당하여, 모든 AI 추론을 서버가 아닌 모바일 기기 내부에서 완결 짓는 온디바이스 아키텍처를 설계하고 구현했습니다. YOLO 1차 객체 탐지 모델 파인튜닝, Gemma VLM 자연어 추론 통합, 감지 상태 머신(State Machine) 고안, 그리고 서버 전송 전 모자이크 비식별 처리를 적용하여 프라이버시 침해 문제와 서버 GPU 비용 문제를 근본적으로 해결했습니다.",
    teamComposition: [
      { role: "AI·Android (본인)", count: 1, tasks: "YOLO+Gemma VLM 통합 추론 파이프라인 설계, Android 상태머신 구현, 데이터 전처리", isMe: true },
      { role: "Android·인프라", count: 1, tasks: "ML Kit 본인인증, 5프레임 시퀀스 설계, Firebase CI/CD, App 인프라" },
      { role: "프론트엔드·Android", count: 2, tasks: "React 실시간 대시보드 및 Android UI/UX, 사전 점검 플로우" },
      { role: "백엔드·인프라", count: 2, tasks: "Spring Boot API, SSE 실시간 채널, Redis Pub/Sub, DB 설계" },
    ],
    contributionBreakdown: [
      { area: "온디바이스 AI 파이프라인 설계", percentage: 35, description: "YOLO(1차 경량 탐지) → 상태머신 누적 → Gemma VLM(정밀 판별) 2단계 추론 구조 구축" },
      { area: "데이터 수집 및 YOLO 모델 최적화", percentage: 25, description: "다양한 조명/환경 데이터셋 증강 및 YOLO 모델 파인튜닝으로 객체 인식률 극대화" },
      { area: "감지 상태 머신(State Machine) 구현", percentage: 25, description: "연속 프레임 감지 조건 룰 기반 제어로 배터리 소모 및 VLM 불필요 호출 최소화" },
      { area: "프라이버시 보호 비식별화 처리", percentage: 15, description: "의심 스냅샷 서버 전송 전 얼굴 영역 모자이크 마스킹 강제 로직 적용" },
    ],
    techStack: [
      { name: "LiteRT & Gemma VLM", reason: "외부 서버 연동 없이 디바이스 내에서 독립적이고 안전하게 자연어 추론을 수행하여 개인정보 유출을 원천 차단하기 위해 도입했습니다." },
      { name: "YOLO (LiteRT)", reason: "모바일 환경에서 빠르고 가볍게 1차 객체 감지를 수행하여 VLM 호출 횟수를 획기적으로 줄이기 위해 채택했습니다." },
      { name: "Kotlin & Jetpack Compose", reason: "최신 Android 선언적 UI와 CameraX 연동, 그리고 On-Device AI 라이브러리와의 네이티브 결합을 위해 사용했습니다." },
      { name: "GitLab CI/CD", reason: "Android App Distribution, Spring Boot 백엔드, React 웹 등 다양한 플랫폼의 빌드 파이프라인을 일원화하기 위해 도입했습니다." },
    ],
    image: "/projects/project5_thumbnail.png",
    features: [
      {
        title: "🤖 온디바이스 AI 부정행위 감지 (YOLO + Gemma VLM)",
        description: "모바일 스마트폰의 한정된 리소스에서 실시간 감지를 완결짓기 위해 YOLO와 Gemma VLM을 계층적으로 설계했습니다.\n\n• YOLO 객체 탐지: 매 프레임마다 스마트폰, 이어폰, 사람 등의 객체를 실시간 감지하여 가볍고 빠르게 1차 필터링을 수행합니다.\n• 상태 머신(State Machine): 순간적인 흔들림이나 노이즈로 인한 불필요한 AI 연산을 막고자, 3초 동안 연속 감지될 때만 정밀 분석 트리거를 작동시킵니다.\n• Gemma VLM 정밀 판별: 트리거 발생 시, 캡처된 스냅샷 이미지와 현재 상황의 텍스트 메타데이터를 결합해 멀티모달 프롬프팅으로 자연어 분석을 수행하고 최종 부정행위 여부를 판별합니다.",
        mediaUrls: [
          "/projects/anvi/app/부정행위1_휴대폰.gif",
          "/projects/anvi/app/부정행위2_이어폰.gif"
        ]
      },
      {
        title: "🔒 엣지 기반 프라이버시 보호 및 사전 점검",
        description: "비대면 시험에서 가장 민감한 개인 정보(얼굴, 신분증, 방 내부 환경)의 유출을 차단하기 위해 모든 검증을 기기 내부에서 처리합니다.\n\n• 기기 상태 점검: 카메라, 마이크, 배터리 잔량, 네트워크 상태를 시험 진입 전에 자동 검증합니다.\n• 본인 확인: ML Kit OCR로 신분증의 텍스트를 추출하고, ArcFace 코사인 유사도 매칭을 통해 5프레임 통계 검증으로 본인임을 확인합니다. 신분증 이미지는 절대 서버로 전송되지 않습니다.\n• 360° 환경 촬영 및 카메라 각도 가이드: 응시자의 주변 환경과 시험 자세가 올바른지 온디바이스 자이로스코프와 시선 정렬 검증을 통해 시험실 환경을 입체적으로 체크합니다.",
        mediaUrls: [
          "/projects/anvi/app/사전점검2_본인확인.gif",
          "/projects/anvi/app/사전점검3_주변환경촬영.gif"
        ]
      },
      {
        title: "📊 감독관용 실시간 대시보드 & 모니터링",
        description: "여러 명의 응시자를 효율적으로 모니터링하기 위해 구축된 실시간 웹 서비스입니다.\n\n• SSE(Server-Sent Events) 실시간 알림: Redis Pub/Sub을 거쳐 백엔드에서 웹 프론트엔드로 부정행위 감지 이벤트를 실시간으로 전달합니다.\n• 비식별 처리된 이미지 리뷰: 서버로 전송되는 이미지는 모바일 단에서 얼굴 마스킹(블러) 처리가 적용되어 있으며, 감독관은 실시간으로 이 비식별 스냅샷을 확인해 부정행위를 확정하거나 오감지를 처리할 수 있습니다.\n• 시험 운영 자동화: 시험 시작 전 대상자 이메일 일괄 QR/PIN 발송 기능과 시험 종료 후 감지 로그가 정리된 PDF 리포트 자동 생성/다운로드 기능을 제공합니다.",
        mediaUrls: [
          "/projects/anvi/web/실시간알림.gif",
          "/projects/anvi/web/응시자상세.gif"
        ]
      }
    ],
    troubleshooting: {
      title: "서버 VLM의 비용·프라이버시 한계 — 온디바이스 계층적 추론으로 극복",
      date: "2026-05",
      environment: "Android CameraX, LiteRT, YOLOv26n, Gemma 4 E2B",
      sections: [
        {
          title: "1. 문제 상황 (Challenge)",
          content: (
            <ul className="list-disc list-inside space-y-2">
              <li><strong>한계 1 — 개인정보 리스크:</strong> 원본 영상 프레임이 클라우드 서버에 축적되는 구조는 응시자 사생활 보호 원칙 위반 소지가 있었습니다.</li>
              <li><strong>한계 2 — 배터리 및 발열 한계:</strong> VLM을 온디바이스로 가져오더라도, 매 프레임마다 거대한 VLM 모델을 호출하면 1분 이내에 기기에 극심한 발열과 배터리 소모가 발생했습니다.</li>
            </ul>
          ),
        },
        {
          title: "2. 해결 전략: Hierarchical On-Device Inference",
          content: (
            <div className="space-y-3">
              <p>서버 연동을 없애고, 기기 안에서도 무거운 AI 호출을 최소화하는 2단계(계층적) 추론 구조와 비식별화 파이프라인을 설계했습니다.</p>
            </div>
          ),
        },
        {
          title: "3. 아키텍처 (Architecture)",
          content: (
            <div className="space-y-3">
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm space-y-2">
                <p className="text-blue-600 dark:text-blue-400">① 1차 경량 탐지 (YOLO)</p>
                <p className="pl-4">매 프레임마다 폰, 이어폰, 사람 등의 바운딩 박스를 빠르게 탐지 (배터리 소모 최소화)</p>
                <p className="text-emerald-600 dark:text-emerald-400 mt-2">② 상태 머신 (State Machine)</p>
                <p className="pl-4">단발성 오작동을 필터링하기 위해 '연속 3초 이상 감지' 시에만 트리거 발동</p>
                <p className="text-purple-600 dark:text-purple-400 mt-2">③ 정밀 판별 (Gemma VLM)</p>
                <p className="pl-4">트리거 발생 시점에 한하여 캡처된 이미지와 상황 텍스트를 VLM에 주입, 멀티모달 분석 수행</p>
                <p className="text-orange-600 dark:text-orange-400 mt-2">④ 서버 전송 (비식별화)</p>
                <p className="pl-4">VLM이 부정행위로 판단하면, 얼굴을 블러 처리한 스냅샷과 JSON 증거 자료만 서버로 비동기 전송</p>
              </div>
            </div>
          ),
        },
        {
          title: "4. 결과 및 성과 (Results)",
          content: (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold">비교 항목</th>
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold text-red-600 dark:text-red-400">전량 프레임 서버 VLM (초기안)</th>
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold text-emerald-600 dark:text-emerald-400">2단계 온디바이스 VLM (최종 적용)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">서버 클라우드 비용</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">매우 높음 (GPU 인스턴스 필수)</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">0 (서버 추론 없음)</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">개인정보 보호</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">리스크 높음 (원본 영상 유출 우려)</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">완전 보호 (비식별화 처리)</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">스마트폰 발열/배터리</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">극심함 (매 프레임 VLM 호출 시)</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">안정적 (가벼운 YOLO 위주 구동)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
      ],
    },
  },
  {
    id: 4,
    title: "Donttaz - AI 기반 스마트 금고 핀테크 플랫폼",
    period: "2026.02 - 2026.03",
    role: "Team Lead (Backend & DevOps)",
    overview: "월급 로그아웃 현상을 막기 위해 기획된, 소비와 저축을 병렬로 관리하는 AI 기반 스마트 금고 모바일 서비스입니다. 6인 핀테크 팀 프로젝트로 진행되었습니다.\n\n주요 기능: OpenAI API 기반 소비 분석 리포트·저축 플랜 추천, 금고 기반 목표 저축, 모계좌 연동 입출금, RabbitMQ 비동기 실시간 알림, 자동 분산 이체",
    contribution: "인프라와 CI/CD 파이프라인, 비동기 알림 및 이체 백엔드 로직을 전담했습니다. Nginx와 Jenkins를 연동한 Blue-Green 환경으로 무중단 배포를 달성했고, 모계좌 동시 접근 시 발생할 수 있는 Race Condition 방어 로직을 구현했습니다.",
    teamComposition: [
      { role: "프론트엔드", count: 2, tasks: "React Native 모바일 UI/UX 개발" },
      { role: "백엔드", count: 2, tasks: "금융·이체 핵심 API 및 AI 연동 비즈니스 로직" },
      { role: "백엔드·인프라 (본인)", count: 1, tasks: "CI/CD 파이프라인, 비동기 아키텍처, 무중단 배포", isMe: true },
      { role: "기획·디자인", count: 1, tasks: "서비스 기획, 화면 설계, AI 서비스 연동 조율" },
    ],
    contributionBreakdown: [
      { area: "Blue-Green 무중단 배포 인프라", percentage: 30, description: "Jenkins + Nginx 연동, Blue-Green 전환 스크립트 설계 및 다운타임 0 달성" },
      { area: "RabbitMQ 비동기 알림 아키텍처", percentage: 25, description: "Manual-ACK + DLQ 설계로 알림 메시지 100% 보존 인프라 구축" },
      { area: "Redis 분산락 동시성 제어", percentage: 25, description: "모계좌 동시 출금 시 Race Condition 방어, 잔액 정합성 100% 보장" },
      { area: "팀 리드 및 프로젝트 관리", percentage: 20, description: "JIRA 스프린트 관리, 코드 리뷰, API 설계 조율, 기술 의사결정 주도" },
    ],
    techStack: [
      { name: "Spring Boot", reason: "복잡한 금융/이체 비즈니스 로직을 모듈화하여 객체지향적으로 관리하고 안정적으로 구축하기 위해 선택했습니다." },
      { name: "Redis", reason: "다수 금고에서의 빈번한 동시 출금 상황 시 모계좌 잔액 정합성을 보장하기 위해 분산 락(Distributed Lock)으로 활용했습니다." },
      { name: "RabbitMQ", reason: "외부 플랫폼 알림 전송 API의 통신 지연이 핵심 비즈니스(입출금) 트랜잭션의 성능을 저하시키지 않도록 비동기로 격리했습니다." },
      { name: "Jenkins", reason: "Blue-Green 아키텍처 환경에서의 무중단 배포 스크립트를 파이프라인으로 구성해 다운타임을 완전히 제거했습니다." },
      { name: "OpenAI API", reason: "소비 분석 리포트와 저축 플랜 추천 기능에 LLM을 연동했습니다. API 응답 지연이 핵심 서비스(입출금)의 응답성에 영향을 주지 않도록 AI 호출을 별도 서버로 분리하여 비동기 처리 구조로 격리했습니다." },
    ],
    image: "/projects/project4-thumbnail.gif",
    features: [
      {
        title: "💰 목적별 위시리스트 금고 생성 및 저축",
        description: "사용자가 원하는 저축 목적별로 가상 금고(위시)를 생성하고 모계좌에서 자금을 안전하게 이체하여 모을 수 있습니다.\n\n• 목적별 가상금고: 사용자는 목표 금액과 기간을 설정해 개별 위시 금고를 생성할 수 있습니다.\n• 논리적 계좌 분리: 하나의 실제 은행 모계좌(Master Account) 아래 여러 가상 금고를 DB 상에서 분리 관리함으로써 20일 계좌 개설 제한을 회피했습니다.\n• 편리한 입출금: 가상 금고에 원하는 시점 혹은 자동 이체 스케줄러를 통해 이자를 포함해 안전하게 자금을 입금하고 해지할 수 있습니다.",
        mediaUrls: [
          "/projects/donttaz/demo/wish_create.gif",
          "/projects/donttaz/demo/vault_deposit.gif"
        ]
      },
      {
        title: "🤖 OpenAI 기반 AI 소비 분석 및 금융 조언",
        description: "사용자의 소비 패턴을 실시간으로 분석해 맞춤형 코멘트와 적절한 저축 계획을 제공합니다.\n\n• AI 소비 리포트: 사용자의 거래 내역 카테고리를 자동 분석하여 주간/월간 소비 패턴 보고서를 생성합니다.\n• AI 저축 플랜 추천: 사용자의 수입과 고정 지출을 계산하여 잉여 자금을 안전하게 묶어둘 수 있는 저축 플랜과 위시리스트 입금 비중을 추천해줍니다.\n• FastAPI AI 서버 분리: Spring Boot 서버와의 API 연동 성능 및 부하를 분산시키기 위해 AI 처리 전용 FastAPI 서버를 독립 배치했습니다.",
        mediaUrls: [
          "/projects/donttaz/demo/ai_report.gif",
          "/projects/donttaz/demo/ai_plan.gif"
        ]
      },
      {
        title: "🔔 RabbitMQ 기반 이벤트 알림 & 외부 협업 툴 연동",
        description: "외부 알림 API 지연시간이 주 거래 트랜잭션에 영향을 주지 않도록 RabbitMQ 비동기 큐를 구축했습니다.\n\n• 실시간 푸시 알림: FCM(Firebase Cloud Messaging)을 이용해 사용자의 입출금 및 주요 알림을 실시간 푸시합니다.\n• 소비 경각심 웹훅: 금고에서 긴급하게 중도 출금하거나 위시를 해지할 경우 협업 툴(Discord, Mattermost)로 경고/소비 알림 메시지를 자동 전송합니다.\n• 메시지 유실 방지: 수동 승인(Manual ACK) 및 DLQ(Dead Letter Queue)를 설계하여 Consumer 장애 시에도 알림 메시지가 유실되지 않도록 보장했습니다.",
        mediaUrls: [
          "/projects/donttaz/demo/push_notification.gif",
          "/projects/donttaz/demo/webhook_withdraw.gif"
        ]
      }
    ],
    retrospective: {
      regrets: [
        "DLQ 누적 메시지에 대한 자동 알림 및 Grafana 모니터링 대시보드를 구축하지 못함",
        "Redis 단일 인스턴스 구성으로 장애 시 분산락 기능의 SPOF(단일 장애점) 위험 존재",
        "Jenkins + Blue-Green 구조가 6인 프로젝트 규모 대비 과도한 복잡도였다는 멘토 피드백 수용 (→ 이후 ANVI에서 GitLab Runner로 전환)",
      ],
      improvements: [
        "Grafana 알림 채널 연동으로 DLQ 임계치 초과 시 자동 Slack 알림 구성",
        "Redis Sentinel 또는 Cluster 도입으로 분산락 HA(고가용성) 확보",
        "기술 선택 시 현재 팀 규모에 맞는 최소 구조를 먼저 검토하는 기준 정립",
      ],
      learnings: [
        "비동기 메시징 아키텍처에서 이벤트 정합성 보장을 위한 코드·인프라 수준의 방어 설계 중요성 체감",
        "무중단 배포 자동화 이후에도 헬스체크 조건과 롤백 시나리오를 사전에 설계해야 함을 배움",
        "기술을 쓸 줄 아는 것보다 현재 규모에서 쓰지 않을 때를 판단하는 것이 더 중요한 역량임을 경험",
      ],
    },
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
          title: "4. Before & After 비교",
          content: (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold">지표</th>
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold text-red-600 dark:text-red-400">Before</th>
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold text-emerald-600 dark:text-emerald-400">After</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">알림 발송 성공률</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">간헐적 누락 발생</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">100% 보존 (DLQ 격리)</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">메시지 처리 방식</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">Auto-ACK (읽는 즉시 삭제)</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">Manual-ACK + 3회 Retry</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">장애 대응</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">메시지 영구 유실</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">DLQ 격리로 복구 가능</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        },
        {
          title: "5. 교훈 (Lessons)",
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
    overview: "개인 기프티콘 체계화 및 방 단위 룸 기반의 안전한 판매/공유 기능을 제공하는 비즈니스 플랫폼입니다. 6인 프로젝트로, 3개의 개별 백엔드 컨테이너 환경 기반으로 제작되었습니다.\n\n주요 기능: 기프티콘 OCR 인식·등록, 공유방 생성 및 판매, 방장 권한 관리, 유효기한 알림, 동적 필터·정렬 검색",
    contribution: "인프라 총괄로서 서브 서비스별 포트를 통일하고 망을 분리하는 네트워크 격리를 실현했고, 변경 여부를 감지해 필요한 타겟만 배포하는 선택적 지속 통합(CI)을 구축해 빌드 병목을 60% 단축했습니다. 아울러 방장 관리 권한 및 동적 기프티콘 검색 API를 구성했습니다.",
    teamComposition: [
      { role: "프론트엔드", count: 2, tasks: "React Native 모바일 UI/UX 개발, OCR 화면 구현" },
      { role: "백엔드", count: 2, tasks: "기프티콘 핵심 API, OCR 처리, 알림 서비스" },
      { role: "백엔드·인프라 (본인)", count: 1, tasks: "CI/CD 파이프라인, 네트워크 격리, 동적 검색 API, 방장 권한 API", isMe: true },
      { role: "기획·디자인", count: 1, tasks: "서비스 기획, 화면 설계, 사용자 시나리오 정의" },
    ],
    contributionBreakdown: [
      { area: "선택적 CI 파이프라인 구축", percentage: 25, description: "Changeset 스캔 기반 선택적 서브 빌드로 전체 빌드 소요 60% 단축" },
      { area: "네트워크 격리 및 Nginx 리버스 프록시", percentage: 25, description: "내부 컨테이너망 분리, 외부 노출 단일 포트(80) 제어" },
      { area: "방장 권한 관리 API", percentage: 25, description: "다중 권한 계층(방장·참여자) 기반 공유방 운영 로직 설계 및 구현" },
      { area: "JPA Specification 동적 검색 API", percentage: 25, description: "필터·정렬 조합 동적 쿼리를 가독성 있는 객체 구조로 구현" },
    ],
    techStack: [
      { name: "Jenkins & Docker", reason: "단일 젠킨스 파이프라인에서 디렉터리 Changeset을 스캔하는 선택적 서브 빌드 아키텍처로 빌드 소요를 줄이고자 연동했습니다." },
      { name: "JPA (Specification)", reason: "방 참여자 다중 권한 계층과 정렬/필터링 등 복잡한 기프티콘 동적 검색 쿼리를 가독성 있는 객체 구조로 관리하기 위해 채택했습니다." },
      { name: "Nginx", reason: "내부 컨테이너를 숨김과 동시에 외부 노출을 단일 포트(80/443)로 제어 및 리버스 프록시 하기 위해 도입했습니다." }
    ],
    image: "/projects/project3-thumbnail.png",
    award: "SSAFY 14기 공통 프로젝트 우수상",
    retrospective: {
      regrets: [
        "선택적 CI 구현에 집중하다 전체 통합 테스트 자동화를 미구성하여 빌드 성공이 기능 정상 동작을 보장하지 못함",
        "기프티콘 DTO 설계 시 FE와의 API 계약 사전 협의 부족으로 핫픽스 2회 발생",
      ],
      improvements: [
        "GitHub Actions + Testcontainers 기반 통합 테스트 파이프라인 추가",
        "OpenAPI 3.0 스펙을 코드 생성 기반으로 운영하여 FE-BE DTO 자동 동기화",
      ],
      learnings: [
        "빌드 시간 60% 단축이라는 정량적 성과가 팀 전체 개발 속도와 배포 주기에 직결됨을 확인",
        "API 설계는 BE 단독 결정이 아닌 FE-BE 공동 협의 산출물이어야 한다는 점을 깨달음",
      ],
    },
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
          title: "4. Before & After 비교",
          content: (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold">지표</th>
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold text-red-600 dark:text-red-400">Before</th>
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold text-emerald-600 dark:text-emerald-400">After</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">썸네일 표시율</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">일부 기프티콘 미표시 (OCR 미처리 케이스)</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">100% 표시 (Fallback 적용)</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">DTO 필드 커버리지</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">5개 필드 (최소 구성)</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">10개 필드 (FE 요구사항 충족)</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">공유방 상세 페이지</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">FE 렌더링 에러 발생</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">정상 동작</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          title: "5. 교훈 (Lessons Learned)",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>방어적 데이터 조회:</strong> 외부 시스템(OCR)의 처리 결과에 의존하는 데이터는 항상 대체 경로(Fallback)를 마련해야 한다.
              </li>
              <li>
                <strong>FE-BE 간 DTO 계약:</strong> API 응답 DTO를 설계할 때 FE가 실제로 필요로 하는 필드를 미리 정의하는 API 계약(Contract)을 명확히 해야 한다.
              </li>
              <li>
                <strong>연쇄 버그의 위험:</strong> 기능 구현 시 해당 데이터가 사용되는 전체 흐름(목록→상세)을 통합적으로 검토해야 한다.
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
    overview: "분산된 사내 교육 정보들을 하나로 통합하고, 제약 없는 원활한 소통을 위해 개발한 '완전 익명' 보장형 사내 모바일 커뮤니티 애플리케이션입니다. (2인 단위 프로젝트)\n\n주요 기능: 익명 게시판(소유권 검증), AI 본문 자동 요약, 교육 일정·공지 통합 조회, 좋아요·댓글, Docker 기반 통합 배포",
    contribution: "소규모 프로젝트 단위로 UI, 백엔드, AI 서빙, 인프라를 총괄했습니다. DB 관리자도 작성자를 역추적할 수 없도록, 식별 해시(Salt+SHA-256) 단방향 알고리즘에 기반한 익명 소유권 검증 로직 구조를 직접 고안했습니다.",
    teamComposition: [
      { role: "풀스택·인프라 (본인)", count: 1, tasks: "백엔드 API, 익명 검증 알고리즘, AI 서빙 연동, Docker 인프라, UI 일부", isMe: true },
      { role: "프론트엔드", count: 1, tasks: "Vue.js 기반 모바일 UI 전체 개발" },
    ],
    contributionBreakdown: [
      { area: "백엔드 API 설계 및 구현", percentage: 40, description: "게시판·댓글·좋아요 등 커뮤니티 핵심 기능 REST API 전담" },
      { area: "익명 소유권 검증 알고리즘", percentage: 25, description: "Salt+SHA-256 단방향 해시로 DB 관리자도 역추적 불가한 구조 고안" },
      { area: "Docker 인프라 구성", percentage: 20, description: "Spring Boot + FastAPI + MySQL 멀티 컨테이너 단일 네트워크망 구성" },
      { area: "FastAPI AI 서빙 연동", percentage: 15, description: "게시글 본문 자동 요약 AI 서비스 독립 모듈화 및 메인 서버 연동" },
    ],
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
          title: "5. Before & After 비교",
          content: (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold">지표</th>
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold text-red-600 dark:text-red-400">Before</th>
                    <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left font-semibold text-emerald-600 dark:text-emerald-400">After</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">게시글 목록 API</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">403 Forbidden</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">200 OK</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">DB 스키마 상태</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">로컬-Docker Volume 불일치</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">초기화 스크립트 자동 마운트, 완전 동기화</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">디버깅 방법</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400">추측 기반 반복 재빌드</td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">Security DEBUG 로그로 근본 원인 즉시 파악</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          title: "6. 교훈 (Lessons Learned)",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>HTTP 상태 코드의 이면:</strong> 403 Forbidden이 반드시 보안 설정 문제만을 의미하지 않는다. 내부 에러로 인한 에러 페이지 리다이렉트 과정에서 권한 문제가 발생할 수 있음을 인지해야 한다.
              </li>
              <li>
                <strong>Docker Volume의 영속성:</strong> DB 스키마 변경 시, 로컬 파일만 수정한다고 Docker Volume 내부의 데이터가 바뀌지 않는다.
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
    overview: "기존 퍼블릭 블록체인의 무분별한 데이터 스팸 문제와 중앙집중형 시스템의 투명성 부족 현상을 융합 해소하기 위해, 인가된 사용자만 참여할 수 있는 퍼미션드(허가형) 데이터 수집 블록체인 네트워크를 구축했습니다.\n\n주요 기능: MSP 기반 노드 인가 관리, 체인코드 기반 데이터 불변 기록, 3-Tier 분산 저장소(RDB·DocumentDB·Chain), Node.js 릴레이어 서버",
    contribution: "Backend Lead로서 프로젝트 내 기술 선정을 주도하고, 관계형 DB, Document DB, 그리고 체인으로 나눈 분리된 3-Tier 저장소 아키텍처를 설계하여 응답 속도 병목을 최적화했습니다.",
    teamComposition: [
      { role: "백엔드·아키텍처 (본인)", count: 1, tasks: "3-Tier 저장소 아키텍처 설계, Node.js 릴레이어 서버, 기술 선정 주도", isMe: true },
      { role: "블록체인·백엔드", count: 1, tasks: "Hyperledger Fabric 네트워크 구성, 체인코드(스마트 컨트랙트) 개발" },
      { role: "프론트엔드", count: 1, tasks: "데이터 조회 UI, 대시보드 개발" },
    ],
    contributionBreakdown: [
      { area: "3-Tier 저장소 아키텍처 설계", percentage: 35, description: "RDB(상태 관리) / CouchDB(도큐먼트) / Fabric Chain 분산 설계로 응답 병목 최적화" },
      { area: "Node.js 릴레이어 서버 개발", percentage: 35, description: "Fabric Gateway SDK 비동기 연동, 블록체인 트랜잭션 중계 서버 구현" },
      { area: "기술 선정 및 아키텍처 리드", percentage: 30, description: "Hyperledger Fabric 도입 근거 수립, 팀 내 기술 방향 결정 주도" },
    ],
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
