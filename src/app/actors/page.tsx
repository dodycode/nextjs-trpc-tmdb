import { PageHeader } from "~/components/page-header";
import { SearchInput } from "../_components/search-input";

import { Container } from "~/components/container";
import { Actors } from "./_components/actors";

async function importInstaller() {
  try {
    return await import("puppeteer/internal/node/install.js");
  } catch {
    console.warn(
      "Skipping browser installation because the Puppeteer build is not available. Run `npm install` again after you have re-built Puppeteer.",
    );
    process.exit(0);
  }
}

export default async function ActorsPage() {
  try {
    const { downloadBrowsers } = await importInstaller();
    await downloadBrowsers();
  } catch (error) {
    console.warn("Browser download failed", error);
  }

  return (
    <Container className="flex flex-col gap-14 py-8">
      <SearchInput />
      <div className="flex flex-col gap-6">
        <PageHeader title="Actors" />
        <Actors />
      </div>
    </Container>
  );
}
