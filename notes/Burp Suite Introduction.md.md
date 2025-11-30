---
title: 🧰 Burp Suite Fundamentals
tags: [burp-suite, web-security, tools, penetration-testing]
created: 2025-10-18
---
---
# 🧰 Burp Suite Fundamentals

### 🕵️ What is Burp Suite?

**Burp Suite** is an integrated platform for **web security testing**. Used by **security professionals** and **bug bounty hunters**, it identifies vulnerabilities in web applications.

> Think of it as a **powerful magnifying glass and toolkit** for analyzing web traffic.

---
### ⚙️ Core Burp Suite Components

| **Component** | **Description** |
|----------------|-----------------|
| **Proxy** | Intercepts and modifies web traffic between the browser and the server. |
| **Repeater** | Allows manual modification and resending of individual HTTP requests. |
| **Intruder** | Automates custom attacks like brute force, SQLi, and XSS. |
| **Scanner** | Automatically finds vulnerabilities (Professional edition only). |
| **Sequencer** | Analyzes session token randomness and identifies weak session management. |

---
### 🌐 The Proxy: Your Web Traffic Middleman

- Acts as a **middleman** for all web traffic.  
- Intercepts requests and responses between browser and server.  
- Lets you **view and modify** requests before reaching the server.  
- Logs traffic in the **HTTP History tab**, even when interception is off.

---
### 🧩 Intercepting Your First Request

When interception is **on**, Burp pauses each HTTP request before it’s sent.

You can:
- View or edit headers, parameters, and cookies  
- Forward, drop, or modify responses  
- Analyze hidden parameters or authentication tokens  

> This helps uncover vulnerabilities like **XSS**, **SQLi**, or **IDOR**.

---
### 🔁 Burp Repeater: Manual Request Manipulation

**Repeater** lets you manually **edit and resend HTTP requests** repeatedly.  

Useful for:
- Testing **multi-step processes** (login flows, transactions)  
- Sending varying inputs to test for **input-based vulnerabilities**  
- Observing how the server reacts to modified requests  

> Perfect for precise, controlled testing.

---
### 💣 Burp Intruder: Automated Attacks

**Intruder** automates custom attacks to test web app defenses.

| **Attack Type** | **Description** |
|------------------|-----------------|
| **Sniper** | Tests one parameter at a time — ideal for fuzzing. |
| **Battering Ram** | Sends the same payload to multiple positions. |
| **Pitchfork** | Uses multiple payload sets in parallel. |
| **Cluster Bomb** | Tests all combinations of payloads across parameters. |

**Common Uses:**
- Brute-forcing credentials  
- Testing for **SQL Injection** and **XSS**  
- Automating fuzzing for parameters  

---
### 🎲 Burp Sequencer: Analyzing Session Tokens

**Sequencer** tests the **randomness and entropy** of tokens and session IDs.

Detects:
- Weak session management  
- Predictable authentication tokens  
- Poor randomness that may lead to **session hijacking**

---
### 🧭 Burp Suite Summary

| **Tool** | **Main Purpose** |
|-----------|------------------|
| **Proxy** | Capture and modify HTTP(S) requests/responses |
| **Repeater** | Replay and tweak requests manually |
| **Intruder** | Automate attacks using payload lists |
| **Scanner** | Automatically detect vulnerabilities |
| **Sequencer** | Analyze session token randomness |

---
### 🧱 What is DVWA?

**DVWA (Damn Vulnerable Web Application)** is a **PHP/MySQL web app** intentionally made insecure.  It helps **security professionals and students** safely practice web security testing.

####  Purpose
- Test your skills and tools in a **legal environment**  
- Learn how vulnerabilities work  
- Understand **how to secure** web applications  

---
### 🔗 Using DVWA with Burp Suite

### Why Use DVWA with Burp

- **Controlled environment** for hands-on web hacking  
- **Realistic vulnerabilities** (SQLi, XSS, File Upload, etc.)  
- Works perfectly with **Burp Proxy**, **Repeater**, and **Intruder**

### Quick Setup Tips

1. Configure your browser to use **Burp Proxy** (`127.0.0.1:8080`).  
2. Open DVWA in your browser and log in.  
3. Capture HTTP requests in Burp’s **HTTP History** tab.  
4. Send interesting ones to:
   - **Repeater** → manual testing  
   - **Intruder** → automated fuzzing  
   - **Sequencer** → session token analysis  

---
### 🧠 Safety & Ethics

- Run DVWA **only in isolated labs** (VM, sandbox, or localhost).  
- Never test **public or production** websites without permission.  
- Always follow **ethical hacking guidelines**.

> 💡 Combine Burp Suite + DVWA for the ultimate beginner-friendly web security lab!

---