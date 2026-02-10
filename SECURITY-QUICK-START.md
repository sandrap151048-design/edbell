# 🔒 Security Quick Start Guide

## ⚠️ IMMEDIATE ACTIONS REQUIRED

### 1. Change MongoDB Password (CRITICAL!)
Current password `edbell123` is **WEAK** and **EXPOSED**!

**Steps**:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to: Database Access → Edit User
3. Click "Edit Password"
4. Generate strong password (use password manager)
5. Update `.env.local` with new password
6. Restart your application

### 2. Generate New NextAuth Secret
```bash
# Run this command to generate a secure secret
openssl rand -base64 32
```

Copy the output and update `.env.local`:
```env
NEXTAUTH_SECRET=<paste-generated-secret-here>
```

### 3. Set Up Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate new app password for "Mail"
5. Update `.env.local`:
```env
SMTP_PASS=<your-16-character-app-password>
```

## ✅ Security Features Implemented

### 1. HTTP Security Headers
- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options (prevents clickjacking)
- ✅ X-Content-Type-Options (prevents MIME sniffing)
- ✅ Strict-Transport-Security (HTTPS enforcement)
- ✅ Referrer-Policy
- ✅ Permissions-Policy

### 2. Rate Limiting
- ✅ 100 requests per minute per IP
- ✅ Automatic cleanup of old entries
- ✅ 429 status code for exceeded limits

### 3. Input Validation & Sanitization
- ✅ XSS prevention
- ✅ SQL injection prevention
- ✅ MongoDB injection prevention
- ✅ Email validation
- ✅ Phone validation
- ✅ URL validation

### 4. Middleware Protection
- ✅ HTTPS redirect in production
- ✅ Rate limiting
- ✅ Security headers on all routes
- ✅ CORS protection

### 5. File Upload Security
- ✅ File size limits (5MB default)
- ✅ File type validation
- ✅ Malicious file detection

## 📋 Security Checklist

### Before Deployment
- [ ] Change MongoDB password
- [ ] Generate new NextAuth secret
- [ ] Set up Gmail app password
- [ ] Enable MongoDB IP whitelist
- [ ] Review all environment variables
- [ ] Test rate limiting
- [ ] Verify HTTPS redirect works
- [ ] Check security headers
- [ ] Run `npm audit`
- [ ] Update all dependencies

### After Deployment
- [ ] Monitor error logs
- [ ] Check for failed login attempts
- [ ] Review rate limit hits
- [ ] Monitor database access
- [ ] Set up alerts for suspicious activity

## 🛠️ Using Security Utilities

### Sanitize User Input
```typescript
import { sanitizeInput } from '@/lib/security';

const cleanInput = sanitizeInput(userInput);
```

### Validate Email
```typescript
import { isValidEmail } from '@/lib/security';

if (!isValidEmail(email)) {
  return { error: 'Invalid email format' };
}
```

### Check Rate Limit
```typescript
import { checkRateLimit } from '@/lib/security';

const { allowed, remaining } = checkRateLimit(userIP, 10, 60000);
if (!allowed) {
  return new Response('Too many requests', { status: 429 });
}
```

### Validate Password Strength
```typescript
import { isStrongPassword } from '@/lib/security';

const { valid, errors } = isStrongPassword(password);
if (!valid) {
  return { errors };
}
```

## 🚨 Security Monitoring

### Check Logs
```bash
# View application logs
npm run dev

# Check for security events
grep "SECURITY" logs/*.log
```

### Run Security Audit
```bash
# Check for vulnerable dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update package-name
```

## 📞 Report Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email: security@edbelledusolutions.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## 🔗 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [npm Security](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

**Remember**: Security is an ongoing process, not a one-time task!

**Last Updated**: February 10, 2026
