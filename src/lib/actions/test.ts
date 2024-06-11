export default async function test() {
  await fetch('/api/auth/refresh', { method: 'GET' });
}
