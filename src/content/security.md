---
title: 'Security'
description: 'Learn about Microlink security protocols, including infrastructure encryption, GDPR compliance, and how we protect your browser automation data.'
lastEdited: true
---

Microlink is committed to protecting the security and privacy of our customers' data. 

We implement comprehensive security measures across our infrastructure, applications, and processes to ensure the confidentiality, integrity, and availability of data processed through our services.

For more information about our data processing practices, please see our [Data Processing Agreement](/dpa), [Subprocessors](/subprocessors), and [Privacy Policy](/privacy).

## Infrastructure Security

**Cloud Infrastructure**

- Multi-cloud architecture across AWS, DigitalOcean, Vercel, and CloudFlare.
- Enterprise-grade data centers with 24/7 monitoring.
- DDoS protection and network security measures.
- Regular security patches and updates.

**Data Protection**

- All data encrypted in transit (HTTPS/TLS 1.2+) and at rest.
- Secure data handling with automatic deletion policies.
- Isolated customer data processing.
- Malware detection and content security scanning.

## Access & Authentication

**API Security**

- API key authentication required for all requests.
- Rate limiting and abuse prevention.
- Request validation and comprehensive logging.

**Administrative Access**

- Multi-factor authentication for all admin access.
- Role-based access controls with least privilege principles.
- Regular access reviews and security training.

## Monitoring & Response

**Security Monitoring**

- 24/7 automated security monitoring and alerting.
- Comprehensive audit logging for all system activities.
- Regular vulnerability scanning and security assessments.

**Incident Response**

- Defined security incident response procedures.
- GDPR-compliant breach notification (within 72 hours to authorities).
- Transparent communication with affected customers.

## Compliance

**Data Protection**

- GDPR compliance with data protection by design.
- Regular security reviews and policy updates.
- Comprehensive vendor security management for all subprocessors.

**Business Continuity**

- Automated daily backups with geographic distribution.
- Disaster recovery procedures and regular testing.
- Defined recovery objectives for critical systems.

## Security Contact

For security-related questions or to report a vulnerability:

**Email**: [hello@microlink.io](mailto:hello@microlink.io?subject=Security%20Inquiry)  
**Subject**: Security Inquiry

## Responsible Disclosure

We consider the security of our systems a top priority, but no matter how much effort we put into it, vulnerabilities can still be present. If you discover one, we want to know so we can address it as quickly as possible.

**What we ask**

- Provide enough detail to reproduce the problem. The IP address or URL of the affected system and a description of the vulnerability is usually sufficient, though complex vulnerabilities may need more.
- Do not run automated scanners against our infrastructure or dashboard. Contact us first and we will set up a sandbox for you.
- Do not take advantage of the problem, for example by downloading more data than needed to demonstrate it, or by deleting or modifying data that belongs to someone else.
- Do not reveal the problem to others until it has been resolved.
- Do not use physical attacks, social engineering, distributed denial of service, spam, or third-party applications.

**What we promise**

- We respond within 3 business days with our evaluation of the report and an expected resolution date.
- We take no legal action against you in regard to the report, provided you followed the above.
- We handle your report confidentially, and do not pass your personal details to third parties without your permission.
- We keep you informed of progress toward resolving the problem.
- We credit you as the discoverer in any public information about the problem, unless you prefer otherwise.

We resolve problems as quickly as we can, and we would like to play an active role in the eventual publication.

**Out of scope**

- Clickjacking on pages with no sensitive actions.
- Unauthenticated, logout or login CSRF.
- Attacks requiring MITM or physical access to a user's device.
- Any activity that could lead to disruption of our service (DoS).
- Content spoofing and text injection without a demonstrated attack vector or the ability to modify HTML/CSS.
- Email spoofing.
- Missing DNSSEC, CAA or CSP.
- Lack of Secure or HttpOnly flag on non-sensitive cookies.
- Dead links.
- User enumeration.

This policy is also published as [security.txt](/.well-known/security.txt), following [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116).

## Acknowledgments

Our thanks to the researchers who have reported vulnerabilities to us:

- [Daniel Wang](https://danielwang.dev)
- Haaris B
