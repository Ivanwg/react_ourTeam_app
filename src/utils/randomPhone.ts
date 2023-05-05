export function getRandomPhoneNumbers() {
  const code = Math.floor(100 + Math.random() * 900);
  const others = Math.floor(1000000 + Math.random() * 900000);
  return {
    formatted: `+7 (${code}) ${others}`,
    pure: `+7${code}${others}`
  };
}