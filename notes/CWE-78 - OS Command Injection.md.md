---
title: CWE-78 — OS Command Injection
tags:
  - web-security
  - injection
  - cwe-78
  - vulnerabilities
created: 2025-10-04
---
---
# 💣 CWE-78 — OS Command Injection

Command Injection happens when an attacker tricks a system into executing unintended commands — convincing a computer to follow whispers it was never meant to hear.

When user inputs aren’t properly sanitized, they can escape their intended context and reach the command shell. Suddenly, what was supposed to print a name might delete files or steal data. That’s the quiet power of injection.

---

### 🧠 Definition & Goal

**OS Command Injection** is a type of *command injection* attack where the attacker’s goal is to execute arbitrary commands on the victim’s operating system via a vulnerable application.

- The attack is executed through a **vulnerable app** (e.g., web app).
- A successful exploit gives the attacker **control over the system**.
- The attacker can then execute **malicious commands** on the OS.

---

### ⚠️ Why It’s Dangerous

- Allows attackers to run arbitrary OS commands.
- Can compromise systems even **without direct OS access**.
- If the vulnerable app runs with **elevated privileges**, the attacker inherits those privileges — amplifying damage.

---

### ⚙️ How It Works

User input is directly concatenated into a system command without sanitization.  
Special characters (`;`, `|`, `&&`, `$()`, etc.) allow attackers to escape normal flow and inject malicious instructions.

```bash
# Example of vulnerable code
user_input = "report.txt"
os.system("cat " + user_input)

# Attacker input
user_input = "report.txt; rm -rf /"

