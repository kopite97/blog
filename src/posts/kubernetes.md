---
title: 'Kubernetes 기록'
date: '2026-03-22'
category: 'Develop'
description: '예전에 프로젝트 할 때 했던 쿠버네티스'
---

## Kubernetes

그냥 넣어보는 예전에 프로젝트할 때 기록했던 Kubernetes

### 핵심 기능

| 기능                                | 설명                                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| **Deployment**                      | 애플리케이션의 선언적 배포/업데이트 (롤링 업데이트, 롤백 포함)                     |
| **Service**                         | Pod 집합에 대한 **고정된 접근 포인트** 제공 (ClusterIP, NodePort, LoadBalancer 등) |
| **ConfigMap / Secret**              | 설정값과 민감정보를 코드와 분리하여 관리                                           |
| **Volume / PersistentVolumeClaim**  | 상태 저장 데이터 (DB, 파일 등)를 위한 스토리지 관리                                |
| **Namespace**                       | 리소스를 논리적으로 격리 (RBAC, 리소스 제한 등과 함께 사용)                        |
| **HPA (Horizontal Pod Autoscaler)** | CPU/메모리 부하에 따라 자동 스케일링                                               |
| **RBAC**                            | 사용자/서비스 계정/CI 등에 역할 기반 접근 제어                                     |
| **ServiceAccount**                  | Pod 또는 CI/CD가 사용할 수 있는 권한 기반 인증 계정                                |

---

### 고급/실전 기능

| 기능                                 | 설명                                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------- |
| **Ingress / Ingress Controller**     | 도메인 기반 트래픽 라우팅 (Nginx, Traefik, Istio 등과 함께 사용)                            |
| **Affinity / Anti-affinity**         | 특정 노드에만 Pod를 배치하거나 특정 노드 피하기 (zone, GPU 등 고려)                         |
| **Taints / Tolerations**             | 노드에 특별한 조건을 걸고 해당 조건을 허용하는 Pod만 스케줄링                               |
| **NetworkPolicy**                    | 네임스페이스 간, Pod 간 네트워크 접근 제어 (방화벽 역할)                                    |
| **PodDisruptionBudget (PDB)**        | 장애조치 중에도 최소한의 Pod가 살아있도록 보장                                              |
| **Custom Resource Definition (CRD)** | 자신만의 Kubernetes 리소스 정의 가능 → `cert-manager`, `ArgoCD`, `Kafka` 연동 등이 CRD 기반 |
| **Job / CronJob**                    | 일회성 작업이나 스케줄된 작업 실행 (백업, DB 정리 등)                                       |
| **InitContainer**                    | 본 컨테이너 실행 전 준비 작업을 처리 (볼륨 초기화, 의존성 체크 등)                          |
| **Sidecar Pattern**                  | 로그 수집기, 프록시 등 보조 컨테이너를 같은 Pod에 실행                                      |
| **NodeSelector / Node Affinity**     | 특정 Node의 Label 기준으로 Pod 배치 제한                                                    |

---

### 생산 환경에서 쓰는 실전 기술

| 기술/도구                    | 용도                                                          |
| ---------------------------- | ------------------------------------------------------------- |
| **Helm**                     | Kubernetes용 패키지 관리자 (템플릿 기반 배포 자동화)          |
| **Kustomize**                | YAML 오버레이 관리 (환경별 YAML 분기)                         |
| **Prometheus + Grafana**     | 모니터링 및 시각화                                            |
| **Loki / EFK**               | 중앙 로그 수집 (ELK or Loki)                                  |
| **cert-manager**             | SSL 인증서 자동 발급/갱신 (Let's Encrypt 등)                  |
| **ArgoCD**                   | GitOps 방식으로 YAML 자동 배포                                |
| **Vault / External Secrets** | 비밀 정보 중앙화 및 자동 주입                                 |
| **Velero**                   | 백업/복구 자동화                                              |
| **KEDA**                     | 외부 메트릭 기반 스케일링 (Kafka 메시지 수, Redis 큐 길이 등) |
| **Istio / Linkerd**          | 서비스 메시로 트래픽 제어, 인증, 관측 등                      |

---

### 실제 시나리오 예시

- **실시간 스트리밍 처리**: Kafka, Redis, WebSocket 앱을 Pod로 구성하고 HPA + node affinity 활용
- **다중 환경 배포**: `kustomize`로 `dev`, `staging`, `prod` 오버레이 관리
- **JWT 인증 연동**: Gateway + Istio 인증 헤더 검사 + RBAC 제어
- **SRE 팀에서 쓰는 기능**: PodDisruptionBudget + PDB, Chaos Mesh로 장애 테스트
- **다국적 서비스 운영**: topology-aware scheduling + multi-region node pool

---

### 배포 flow

1. **Kops**를 통해 Kubernetes 클러스터 생성

1. 생성된 클러스터를 통해 **프로비저닝** 실행

1. github Actions를 이용해 CI/CD 구축
   1. front는 argoCD에서 CD 담당

1. develop 브랜치 merge(push)시 CD실행

### 서비스 flow

1. 배포된 URL로 접속 (프론트)

1. **프론트에서 백엔드로 요청**

프론트 ↔ 백 연결 과정

- frontend 네임스페이스에 배포된 front-app 의 서비스 타입을 LoadBalancer로 설정
- ELB 리스너 포트를 443, 인스턴스 포트를 front의 포트와 연결
- 다른 모든 Pod들의 Service 타입은 ClusterIP
- API요청 시 프론트는 요청을 gateway로 전달
  - 최초 구현시는 DNS형태의 URL로 API요청
  - 이미 같은 클러스터내의 Pod들인데, 굳이 돈나가게 그럴필요 있나 싶어서 변경
  - front-app도커 컨테이너 내에 nginx를 적용하여, API요청 시 그 요청을 http://gateway-service.default.svc.cluster.local:8080으로 전달

1. 백엔드에서 비즈니스 플로우 수행

1. 프론트로 결과 반환
