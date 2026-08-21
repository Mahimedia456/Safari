import "dotenv/config";

const base =
  process.env.API_SMOKE_BASE_URL ??
  `http://localhost:${process.env.PORT ?? "5000"}/api/v1`;

async function main() {
  const targets = [
    "/system/ready",
    "/health",
  ];

  let failed = false;

  for (const target of targets) {
    try {
      const response = await fetch(`${base}${target}`);
      const body = await response.text();

      console.log(
        `[${response.status}] ${target}`,
        body.slice(0, 500),
      );

      if (!response.ok) failed = true;
    } catch (error) {
      failed = true;
      console.error(`[FAILED] ${target}`, error);
    }
  }

  if (failed) process.exit(1);
}

main();
