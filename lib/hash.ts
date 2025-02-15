import crypto from 'crypto';

export function createContentHash(cvData: any, jobData: any): string {
  const content = JSON.stringify({ cv: cvData, job: jobData });
  return crypto
    .createHash('sha256')
    .update(content)
    .digest('hex');
}
