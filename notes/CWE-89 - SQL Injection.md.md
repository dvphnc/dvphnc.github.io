---
title: SQL Injection
tags:
  - web-security
  - sql-injection
  - cwe-89
  - vulnerabilities
created: 2025-10-18
---
---
# 💾 SQL Injection

SQL Injection (SQLi) is one of the most notorious and impactful web vulnerabilities. It occurs when a web application builds a database query using **unvalidated user input**, allowing attackers to manipulate SQL commands and gain unauthorized access to data.

When software fails to **neutralize special characters** (like `'`, `"`, `;`, `--`), attackers can alter how queries are executed — often with devastating results.

---

### 🧠 What Is SQL?

**Structured Query Language (SQL)** is the standard language for managing and manipulating relational databases.  

It allows developers to:

- Retrieve information (`SELECT`)
- Add or modify data (`INSERT`, `UPDATE`, `DELETE`)
- Control access (`GRANT`, `REVOKE`)

When applications use SQL dynamically with external input, they risk being tricked into executing unintended commands.

---

### 💉 What Does “Injection” Mean?

**Injection** refers to inserting malicious input into a program to alter its execution.  
In SQL Injection, this means feeding crafted SQL code into a field or parameter to manipulate the database.

---

### ⚙️ How SQL Injection Happens — The Core Vulnerability

A vulnerable app constructs SQL commands directly from user input without proper sanitization or parameterization.  

```python
# Vulnerable example
username = request.GET['user']
query = "SELECT * FROM users WHERE username = '" + username + "';"
cursor.execute(query)```

If a user enters:

`' OR '1'='1`

The final query becomes:

`SELECT * FROM users WHERE username = '' OR '1'='1';`

This condition is always true — granting access to all user accounts.

---

### 🔐 The Login Bypass

A classic example of SQL Injection in action:

|Input Field|Attacker Enters|Result|
|---|---|---|
|**Username**|`' OR '1'='1`|Bypasses authentication|
|**Password**|`anything`|Ignored — the injected logic returns true|

**Effect:** The attacker logs in as the first user in the database, often the administrator.

---

### ☠️ Why SQL Injection Is Dangerous

|Impact|Description|
|---|---|
|**Data Breach**|Attackers can steal sensitive info (credentials, personal data, credit cards).|
|**Data Loss/Corruption**|Data can be modified or deleted.|
|**Loss of Accountability**|Attack actions may be untraceable.|
|**Denial of Service (DoS)**|Overloaded queries can crash databases.|
|**Full System Compromise**|In severe cases, attackers can execute OS-level commands via the DB.|

---

### 🛡️ Mitigation Strategies

#### 1. **Prepared Statements (Parameterized Queries)**

- **How:** Define query structure first; user input is bound later as data.
- **Why:** Prevents user input from being treated as SQL code.
    
- **Example (Conceptual):**
    
    `SELECT * FROM users WHERE username = ? AND status = ?;`
    
    Bind user input to `?` separately.
    

---

#### 2. **Input Validation**

- **How:** Enforce strict rules for input (type, length, format, character set).
- **Why:** Reduces attack surface early.
    
- **Examples:**
    
    - Whitelist allowed characters.
    - Ensure numbers are numeric.
    - Limit max input length.
        

---

#### 3. **Stored Procedures (Used Safely)**

- **How:** Use predefined database logic without dynamically building queries.
- **Why:** Reduces direct SQL exposure.
- ⚠️ **Caution:** Still vulnerable if they build dynamic SQL with unvalidated input.
    

---

#### 4. **Escaping User Input (Use with Caution)**

- **How:** Escape special characters (e.g., `'` → `\'`).
- **Why:** Fallback when prepared statements aren’t available.
- ⚠️ **Danger:** Database-specific and error-prone. Use only as a last resort.
    

---

### 🧱 Additional Best Practices

- **Principle of Least Privilege:**  
    Database users should have only the permissions they need.  
    Example: The web app user should not be able to drop tables or modify schema.
    
- **Error Handling:**  
    Don’t expose SQL error messages to users; they reveal too much about the database structure.
    
- **Regular Security Testing:**  
    Perform code reviews, vulnerability scans, and penetration tests regularly.
    

---

### 🧾 Conclusion

- SQL Injection (SQLi) allows attackers to **manipulate database queries** via malicious input.
- It can lead to **data theft, corruption, unauthorized access**, or even **complete system compromise**.
- The root cause is **unsafe handling of user input** during SQL query construction.
    
- Defend with:
    
    - ✅ **Prepared Statements**
    - ✅ **Input Validation**
    - ✅ **Stored Procedures (Safe Use)**
    - ✅ **Least Privilege Principle**
        

> 💡 Remember: SQL Injection thrives where trust is misplaced. Validate, parameterize, and never trust user input.