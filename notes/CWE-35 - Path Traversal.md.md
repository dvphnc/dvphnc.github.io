---
title: 🧭 CWE-35 — Path Traversal (Directory Traversal)
tags: [CWE-35, path-traversal, web-security, vulnerabilities]
created: 2025-10-18
---
---
# 🧭 CWE-35 — Path Traversal (Directory Traversal)

*Directory Traversal* (aka Path Traversal) is a vulnerability that allows an attacker to access files and directories outside the intended application directory by manipulating file path input. Exploits often use traversal sequences (e.g., `../`) or encoded variants to reach sensitive filesystem locations.

---

### 🗂️ File System
A **file system** is the operating system component that organizes and stores files and directories on persistent storage. Web applications interact with the file system to read or write resources (pages, uploads, config files). Improper handling of file paths can expose the underlying file system to attacker control.

---

### 🔓 Directory Traversal Attacks 
**Directory Traversal Attacks** occur when an application accepts a path or filename from an external source and fails to properly validate or normalize it. The attacker crafts input to traverse directories (e.g., `../../etc/passwd`) and access files outside the web root or allowed directories.

---

### ⚠️ Consequences of Directory Traversal

- **Unauthorized Access to Sensitive Information**  
  Attackers can read confidential files outside the web root (e.g., system config, `/etc/passwd`, database credentials, source code), causing data breaches and privacy violations.

- **Modification or Deletion of Files**  
  If write access is possible, attackers may modify or delete critical files, causing service disruption, data loss, and financial or operational damage.

- **Further System Compromise**  
  Access to sensitive files can reveal server architecture, credentials, and configurations that facilitate privilege escalation or lateral movement.

- **Information Disclosure & Reconnaissance**  
  Even read-only access can provide valuable intelligence for subsequent attacks (paths, versions, error messages).

---

### 🛠️ Directory Traversal Techniques

- **Simple Dot-Dot-Slash (`../`)** — basic upward traversal.  
- **Path Separator Variations (`/`, `\`)** — platform-specific separators.  
- **Percent-Encoding (`%2e%2e%2f`)** — URL-encoded traversal.  
- **Double Encoding (`%252e%252e%252f`)** — encoder confusion bypass.  
- **Unicode Encoding (`%u002e%u002e%u002f`)** — Unicode-encoded traversal.  
- **Mangled Paths (`....//...`)** — path normalization tricks.  
- **NULL Byte Injection (`%00`)** — terminating strings in some legacy APIs.  

(Attackers chain these techniques to bypass naive filters and normalization routines.)

---

### 🛡️ Preventing Directory Traversal

- **Validate and Sanitize User Input (Allowlist)**  
  Use an *accept-known-good* strategy: only permit specific filenames/IDs and reject everything else.

- **Use Allow Lists for File Access**  
  Map user-provided identifiers to pre-approved files or directories rather than using raw paths.

- **Avoid Using User Input Directly in File Paths**  
  Construct paths programmatically from safe components; do not concatenate unchecked user data.

- **Path Normalization Functions**  
  Use built-in path normalization APIs (e.g., realpath, Path.resolve) to resolve `.`/`..` sequences then verify the resolved path is inside an allowed directory.

- **Access Control & Least Privilege**  
  Ensure the application runs with minimal permissions and restrict which files the process can read/write.

- **Isolate Execution Environments**  
  Run the application in a confined environment (chroot, containers, restricted mounts) to limit what an attacker can access.

- **Reject Encoded/Alternate Representations**  
  Normalize and decode inputs before validation to catch encoded traversal attempts.

---

### 🧰 Directory Traversal Tools (for testing & assessment)

- **Burp Suite** — web testing platform with scanning and manual testing features.  
- **OWASP ZAP (Zed Attack Proxy)** — open-source scanner for automated detection.  
- **Nikto** — web server scanner that checks for dangerous files and misconfigurations.  
- **DotDotPwn** — tool specifically designed to test directory traversal payloads.  
- **Metasploit** — penetration testing framework with modules for traversal exploits.  
- **DirBuster / Dirsearch** — brute-forcing tools to discover hidden directories and files.

(Use these tools responsibly for authorized testing only.)

---

### 🧾 Summary / Conclusion

- **CWE-35 Path Traversal** enables attackers to break directory boundaries and access unintended filesystem resources.  
- Mitigation centers on **strict input allowlisting, path normalization + verification, least privilege, and environment isolation**.  
- Regular testing with vetted tools and secure coding practices reduce the risk and impact of traversal vulnerabilities.
